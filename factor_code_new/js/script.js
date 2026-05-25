// DOM元素获取 - 初始化为null，将在DOMContentLoaded事件中重新获取
let chatHistory = null;
let userInput = null;
let sendBtn = null;
let toggleProductInfo = null;
let productDetails = null;
let generateQuestionnaire = null;
let questionnairePreview = null;
let submitDelegation = null;
let loading = null;
// 新添加的DOM元素
let addSourceBtn = null;
let uploadFile = null;
let aiSearchBtn = null;
let aiSearchInput = null;
let searchType = null;
let searchRegion = null;
let searchInput = null;
let sourceList = null;
let aiSuggestions = null;
// AI对话功能按钮
let deepThinkingBtn = null;
let webSearchBtn = null;
let attachBtn = null;
// 产品切换相关DOM元素
let currentProduct = null;
let productOptions = null;
let productOptionItems = null;
// 左侧区域收缩/展开相关DOM元素
let toggleSidebarBtn = null;
let delegationContentNew = null;

// 多产品信息数据（模拟）
const productsData = {
    1: {
        name: "DPP-4抑制剂",
        indications: "用于治疗2型糖尿病，尤其是在饮食和运动基础上血糖控制不佳的患者。适用于单药治疗或与其他降糖药物联合使用。",
        pathology: "该药物通过抑制二肽基肽酶-4（DPP-4）的活性，延长胰高血糖素样肽-1（GLP-1）和葡萄糖依赖性促胰岛素分泌多肽（GIP）的作用时间，从而促进胰岛素分泌，抑制胰高血糖素释放，降低血糖水平。",
        treatmentPath: "1. 初始治疗：单药治疗，每日一次，每次100mg；2. 联合治疗：可与二甲双胍、磺脲类药物或胰岛素联合使用；3. 剂量调整：根据血糖控制情况，可调整至最大剂量200mg/日；4. 特殊人群：肾功能不全患者需调整剂量，肝功能不全患者无需调整。",
        marketData: "市场规模：1500亿元，年增长率：12%",
        competitiveData: "主要竞品：GLP-1受体激动剂、SGLT-2抑制剂"
    },
    2: {
        name: "GLP-1受体激动剂",
        indications: "用于治疗2型糖尿病，尤其是伴有肥胖或超重的患者。适用于单药治疗或与其他降糖药物联合使用。",
        pathology: "通过激活GLP-1受体，促进胰岛素分泌，抑制胰高血糖素释放，延缓胃排空，增加饱腹感，从而降低血糖并减轻体重。",
        treatmentPath: "1. 初始治疗：皮下注射，每周一次或每日一次；2. 联合治疗：可与二甲双胍、DPP-4抑制剂或SGLT-2抑制剂联合使用；3. 剂量调整：根据血糖控制情况和耐受性逐渐调整剂量；4. 特殊人群：肾功能不全患者需调整剂量。",
        marketData: "市场规模：2000亿元，年增长率：25%",
        competitiveData: "主要竞品：DPP-4抑制剂、SGLT-2抑制剂"
    },
    3: {
        name: "SGLT-2抑制剂",
        indications: "用于治疗2型糖尿病，尤其是伴有心血管疾病或慢性肾病的患者。适用于单药治疗或与其他降糖药物联合使用。",
        pathology: "通过抑制肾脏近曲小管的SGLT-2转运蛋白，减少葡萄糖重吸收，增加尿糖排泄，从而降低血糖。同时具有降压、减重和心血管保护作用。",
        treatmentPath: "1. 初始治疗：口服，每日一次；2. 联合治疗：可与二甲双胍、DPP-4抑制剂或GLP-1受体激动剂联合使用；3. 剂量调整：根据肾功能调整剂量；4. 特殊人群：肾功能不全患者需调整剂量或禁用。",
        marketData: "市场规模：1800亿元，年增长率：20%",
        competitiveData: "主要竞品：DPP-4抑制剂、GLP-1受体激动剂"
    },
    4: {
        name: "二甲双胍",
        indications: "用于治疗2型糖尿病，尤其是伴有肥胖的患者。是2型糖尿病治疗的一线用药，可单药或联合其他降糖药物使用。",
        pathology: "通过抑制肝脏葡萄糖输出，增加外周组织对葡萄糖的摄取和利用，改善胰岛素敏感性，从而降低血糖。",
        treatmentPath: "1. 初始治疗：口服，每日1-2次；2. 联合治疗：可与任何其他降糖药物联合使用；3. 剂量调整：根据血糖控制情况逐渐调整剂量；4. 特殊人群：肾功能不全患者需调整剂量或禁用。",
        marketData: "市场规模：1200亿元，年增长率：8%",
        competitiveData: "主要竞品：各类新型降糖药物"
    }
};

// 当前选中的产品ID
let currentProductId = 1;

// 模拟AI回复数据
const aiResponses = {
    default: "感谢您的分享。我正在分析您的需求，请继续描述更多细节，以便我为您生成更精准的调研问卷。",
    product: "基于您提供的产品信息，我已经更新了产品详情。您可以查看右侧的产品信息区域，了解适应症、病理机制和诊疗路径。",
    purpose: "您的委托目的很明确。我可以帮您生成针对该目标的调研问卷，重点关注医生对产品的认知度、使用意愿和改进建议。",
    generate: "问卷已生成！请查看右侧的问卷预览区域。您可以根据需要进行调整，或直接提交委托。"
};

// 模拟生成的问卷数据
const generatedQuestionnaire = [
    {
        number: 1,
        text: "您对该药物的适应症了解程度如何？",
        type: "单选题",
        options: ["非常了解", "比较了解", "一般了解", "不太了解", "完全不了解"]
    },
    {
        number: 2,
        text: "您认为该药物的病理机制是否清晰易懂？",
        type: "单选题",
        options: ["非常清晰", "比较清晰", "一般", "不太清晰", "完全不清晰"]
    },
    {
        number: 3,
        text: "您在临床实践中是否使用过该药物？",
        type: "单选题",
        options: ["经常使用", "偶尔使用", "从未使用", "听说过但未使用"]
    },
    {
        number: 4,
        text: "您认为该药物的优势是什么？（可多选）",
        type: "多选题",
        options: ["降糖效果显著", "安全性高", "使用方便", "副作用少", "性价比高", "其他"]
    },
    {
        number: 5,
        text: "您对该药物的诊疗路径有什么建议或改进意见？",
        type: "开放性问题"
    }
];

// 添加消息到聊天记录
function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    
    const avatarDiv = document.createElement('div');
    avatarDiv.className = `message-avatar ${isUser ? 'user-avatar' : 'ai-avatar'}`;
    avatarDiv.textContent = isUser ? '我' : 'AI';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    // 处理换行
    const paragraphs = content.split('\n');
    paragraphs.forEach(para => {
        if (para.trim()) {
            const p = document.createElement('p');
            p.textContent = para;
            contentDiv.appendChild(p);
        }
    });
    
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
    chatHistory.appendChild(messageDiv);
    
    // 滚动到底部
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

// 模拟AI回复
function simulateAIResponse(userMessage) {
    showLoading();
    
    // 模拟AI思考时间
    setTimeout(() => {
        hideLoading();
        
        // 根据用户输入内容生成不同的回复
        let aiResponse = aiResponses.default;
        
        if (userMessage.toLowerCase().includes('产品') || userMessage.toLowerCase().includes('适应症') || userMessage.toLowerCase().includes('病理')) {
            aiResponse = aiResponses.product;
            updateProductInfo();
        } else if (userMessage.toLowerCase().includes('目的') || userMessage.toLowerCase().includes('目标') || userMessage.toLowerCase().includes('需求')) {
            aiResponse = aiResponses.purpose;
        }
        
        addMessage(aiResponse, false);
    }, 1500);
}

// 显示加载动画
function showLoading() {
    loading.style.display = 'flex';
}

// 隐藏加载动画
function hideLoading() {
    loading.style.display = 'none';
}

// 更新产品信息
function updateProductInfo() {
    document.getElementById('indications').textContent = productData.indications;
    document.getElementById('pathology').textContent = productData.pathology;
    document.getElementById('treatmentPath').textContent = productData.treatmentPath;
    
    // 自动展开产品信息
    if (productDetails.style.display === 'none') {
        productDetails.style.display = 'block';
        toggleProductInfo.textContent = '收起';
    }
}

// 生成问卷
function generateQuestionnairePreview() {
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        
        // 清空预览区域
        questionnairePreview.innerHTML = '';
        
        // 添加问卷标题
        const questionnaireTitle = document.createElement('h3');
        questionnaireTitle.textContent = '调研问卷预览';
        questionnaireTitle.style.marginBottom = '20px';
        questionnaireTitle.style.color = '#2c3e50';
        questionnairePreview.appendChild(questionnaireTitle);
        
        // 添加问卷题目
        generatedQuestionnaire.forEach(question => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';
            
            const questionNumber = document.createElement('div');
            questionNumber.className = 'question-number';
            questionNumber.textContent = `问题 ${question.number}`;
            questionDiv.appendChild(questionNumber);
            
            const questionText = document.createElement('div');
            questionText.className = 'question-text';
            questionText.textContent = question.text;
            questionDiv.appendChild(questionText);
            
            const questionType = document.createElement('div');
            questionType.className = 'question-type';
            questionType.textContent = question.type;
            questionDiv.appendChild(questionType);
            
            // 添加选项（如果有）
            if (question.options) {
                const optionsList = document.createElement('ul');
                optionsList.style.listStyle = 'none';
                optionsList.style.padding = '0';
                optionsList.style.margin = '10px 0 0 0';
                
                question.options.forEach((option, index) => {
                    const optionItem = document.createElement('li');
                    optionItem.style.marginBottom = '8px';
                    optionItem.style.display = 'flex';
                    optionItem.style.alignItems = 'center';
                    
                    const optionInput = document.createElement('input');
                    optionInput.type = question.type === '多选题' ? 'checkbox' : 'radio';
                    optionInput.name = `question-${question.number}`;
                    optionInput.style.marginRight = '10px';
                    
                    const optionLabel = document.createElement('label');
                    optionLabel.textContent = option;
                    optionLabel.style.cursor = 'pointer';
                    
                    optionItem.appendChild(optionInput);
                    optionItem.appendChild(optionLabel);
                    optionsList.appendChild(optionItem);
                });
                
                questionDiv.appendChild(optionsList);
            } else {
                // 开放性问题的输入框
                const openInput = document.createElement('textarea');
                openInput.rows = 3;
                openInput.style.width = '100%';
                openInput.style.padding = '10px';
                openInput.style.border = '1px solid #e0e0e0';
                openInput.style.borderRadius = '6px';
                openInput.style.marginTop = '10px';
                openInput.placeholder = '请输入您的回答...';
                questionDiv.appendChild(openInput);
            }
            
            questionnairePreview.appendChild(questionDiv);
        });
        
        // 添加AI消息
        addMessage(aiResponses.generate, false);
    }, 2000);
}

// 提交委托
function submitDelegationForm() {
    const activityName = document.getElementById('activityName').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const targetDoctors = document.getElementById('targetDoctors').value;
    
    // 表单验证
    if (!activityName || !startDate || !endDate || !targetDoctors) {
        alert('请填写完整的委托信息！');
        return;
    }
    
    if (new Date(startDate) > new Date(endDate)) {
        alert('开始日期不能晚于结束日期！');
        return;
    }
    
    showLoading();
    
    setTimeout(() => {
        hideLoading();
        
        // 模拟提交成功
        alert('委托提交成功！我们将尽快处理您的请求。');
        
        // 重置表单
        document.getElementById('activityName').value = '';
        document.getElementById('startDate').value = '';
        document.getElementById('endDate').value = '';
        document.getElementById('targetDoctors').value = '';
        
        // 添加成功消息到聊天记录
        addMessage('委托已成功提交！我们将在3个工作日内与您联系，确认调研细节。', false);
    }, 1500);
}

// 轮播文字功能
function initAICarousel() {
    const aiInput = document.querySelector('.ai-input');
    const aiPlaceholder = document.getElementById('aiPlaceholder');
    if (!aiInput) return;
    
    // 更新轮播文字列表，更改为关于AI咨询的文案
    const carouselTexts = [
        '最近有什么不懂的可以来咨询AI哦',
        'AI可以帮您撰写高质量的学术论文',
        'AI可以分析产品的市场前景',
        'AI可以生成专业的调研问卷',
        'AI可以提供最新的研究进展',
        'AI可以帮您进行文献综述',
        'AI可以解答您的学术问题',
        'AI可以辅助您的科研工作'
    ];
    
    let currentIndex = 0;
    
    // 设置初始文字 - 同时更新input的placeholder和span的内容
    aiInput.placeholder = carouselTexts[currentIndex];
    if (aiPlaceholder) {
        aiPlaceholder.textContent = carouselTexts[currentIndex];
    }
    
    // 轮播定时器 - 3秒切换一次
    setInterval(() => {
        // 更新索引
        currentIndex = (currentIndex + 1) % carouselTexts.length;
        
        // 更新input的placeholder
        aiInput.placeholder = carouselTexts[currentIndex];
        
        // 同时更新span的内容（如果存在）
        if (aiPlaceholder) {
            aiPlaceholder.textContent = carouselTexts[currentIndex];
        }
    }, 3000);
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', () => {
    // 重新获取DOM元素
    chatHistory = document.getElementById('chatHistory');
    userInput = document.getElementById('userInput');
    sendBtn = document.getElementById('sendBtn');
    toggleProductInfo = document.getElementById('toggleProductInfo');
    productDetails = document.querySelector('.product-details');
    generateQuestionnaire = document.getElementById('generateQuestionnaire');
    questionnairePreview = document.getElementById('questionnairePreview');
    submitDelegation = document.getElementById('submitDelegation');
    loading = document.getElementById('loading');
    
    // 新添加的DOM元素获取
    addSourceBtn = document.getElementById('addSourceBtn');
    uploadFile = document.getElementById('uploadFile');
    aiSearchBtn = document.getElementById('aiSearchBtn');
    aiSearchInput = document.getElementById('aiSearchInput');
    searchType = document.getElementById('searchType');
    searchRegion = document.getElementById('searchRegion');
    searchInput = document.getElementById('searchInput');
    sourceList = document.getElementById('sourceList');
    aiSuggestions = document.getElementById('aiSuggestions');
    
    // 产品切换相关DOM元素获取
    currentProduct = document.getElementById('currentProduct');
    productOptions = document.getElementById('productOptions');
    if (productOptions) {
        productOptionItems = productOptions.querySelectorAll('.product-option');
    }
    
    // 左侧区域收缩/展开相关DOM元素获取
    toggleSidebarBtn = document.getElementById('toggleSidebarBtn');
    delegationContentNew = document.querySelector('.delegation-content-new');
    
    // AI对话功能按钮获取
    deepThinkingBtn = document.getElementById('deepThinking');
    webSearchBtn = document.getElementById('webSearch');
    attachBtn = document.getElementById('attachBtn');
    
    // 设置默认日期
    const startDateElement = document.getElementById('startDate');
    if (startDateElement) {
        const today = new Date().toISOString().split('T')[0];
        startDateElement.value = today;
        
        // 设置默认结束日期为30天后
        const endDateElement = document.getElementById('endDate');
        if (endDateElement) {
            const endDate = new Date();
            endDate.setDate(endDate.getDate() + 30);
            endDateElement.value = endDate.toISOString().split('T')[0];
        }
    }
    
    // 自动滚动到聊天记录底部
    if (chatHistory) {
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
    
    // 事件监听器
    
    // 发送消息按钮点击事件
    if (sendBtn && userInput) {
        sendBtn.addEventListener('click', () => {
            const message = userInput.value.trim();
            if (message) {
                // 添加用户消息
                addMessage(message, true);
                
                // 清空输入框
                userInput.value = '';
                
                // 模拟AI回复
                simulateAIResponse(message);
            }
        });

        // 回车键发送消息
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendBtn.click();
            }
        });
    }

    // 切换产品信息显示
    if (toggleProductInfo && productDetails) {
        toggleProductInfo.addEventListener('click', () => {
            if (productDetails.style.display === 'none') {
                productDetails.style.display = 'block';
                toggleProductInfo.textContent = '收起';
            } else {
                productDetails.style.display = 'none';
                toggleProductInfo.textContent = '展开';
            }
        });
    }

    // 生成问卷按钮点击事件
    if (generateQuestionnaire) {
        generateQuestionnaire.addEventListener('click', generateQuestionnairePreview);
    }

    // 提交委托按钮点击事件
    if (submitDelegation) {
        submitDelegation.addEventListener('click', submitDelegationForm);
    }
    
    // 新添加的事件监听器
    
    // 添加来源按钮点击事件
    if (addSourceBtn && uploadFile) {
        addSourceBtn.addEventListener('click', () => {
            uploadFile.click();
        });
        
        // 文件上传事件
        uploadFile.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                // 模拟文件上传成功
                showLoading();
                setTimeout(() => {
                    hideLoading();
                    addSourceToList(file.name, '本地文件');
                    addMessage(`已成功上传文件：${file.name}`, false);
                    // 重置文件输入
                    uploadFile.value = '';
                }, 1500);
            }
        });
    }
    
    // AI搜索按钮点击事件
    if (aiSearchBtn && aiSearchInput) {
        aiSearchBtn.addEventListener('click', () => {
            const searchQuery = aiSearchInput.value.trim();
            if (searchQuery) {
                performAISearch(searchQuery);
            }
        });
        
        // AI搜索输入框回车键事件
        aiSearchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const searchQuery = aiSearchInput.value.trim();
                if (searchQuery) {
                    performAISearch(searchQuery);
                }
            }
        });
    }
    
    // 搜索输入框事件
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            filterSources(searchTerm);
        });
    }
    
    // AI猜测问题点击事件
    if (aiSuggestions) {
        const suggestionItems = aiSuggestions.querySelectorAll('.suggestion-item');
        suggestionItems.forEach(item => {
            item.addEventListener('click', () => {
                const question = item.getAttribute('data-question');
                if (question) {
                    // 将问题填入输入框
                    if (userInput) {
                        userInput.value = question;
                        // 自动发送
                        sendBtn.click();
                    }
                }
            });
        });
    }
    
    // 产品切换功能事件监听器
    if (currentProduct && productOptionItems) {
        productOptionItems.forEach(item => {
            item.addEventListener('click', () => {
                const productId = parseInt(item.getAttribute('data-product-id'));
                switchProduct(productId);
            });
        });
    }
    
    // 左侧区域收缩/展开功能事件监听器
    if (toggleSidebarBtn && delegationContentNew) {
        toggleSidebarBtn.addEventListener('click', () => {
            delegationContentNew.classList.toggle('sidebar-collapsed');
            
            // 切换图标方向
            const svg = toggleSidebarBtn.querySelector('svg');
            if (delegationContentNew.classList.contains('sidebar-collapsed')) {
                svg.innerHTML = '<polyline points="9 18 15 12 9 6"></polyline>';
            } else {
                svg.innerHTML = '<polyline points="15 18 9 12 15 6"></polyline>';
            }
        });
    }
    
    // 组织架构树功能
const treeNodes = document.querySelectorAll('.tree-node-header');
treeNodes.forEach(node => {
    node.addEventListener('click', () => {
        // 移除所有节点的激活状态
        treeNodes.forEach(n => n.classList.remove('active'));
        
        // 为当前节点添加激活状态
        node.classList.add('active');
        
        // 查找子节点并切换显示状态
        const children = node.nextElementSibling;
        if (children && children.classList.contains('tree-children')) {
            children.classList.toggle('show');
        }
    });
});
    
    // AI对话功能按钮事件监听器
    
    // 深度思考按钮点击事件
    if (deepThinkingBtn) {
        deepThinkingBtn.addEventListener('click', () => {
            // 切换激活状态
            deepThinkingBtn.classList.toggle('active');
        });
    }
    
    // 联网搜索按钮点击事件
    if (webSearchBtn) {
        webSearchBtn.addEventListener('click', () => {
            // 切换激活状态
            webSearchBtn.classList.toggle('active');
        });
    }
    
    // 附件按钮点击事件
    if (attachBtn) {
        attachBtn.addEventListener('click', () => {
            // 这里可以添加文件上传逻辑
            alert('附件功能正在开发中');
        });
    }
    
    // 初始化产品信息
    updateProductInfo();
    
    // 初始化上传弹窗功能
    initUploadModal();
});

// 个人中心下拉菜单交互功能已在menu.js中实现

// 新添加的功能函数

// 执行AI搜索
function performAISearch(query) {
    showLoading();
    
    // 模拟AI搜索过程
    setTimeout(() => {
        hideLoading();
        
        // 模拟搜索结果
        const searchResults = [
            {
                title: `${query}的最新研究进展 - 医学期刊网`,
                url: `https://example.com/research/${encodeURIComponent(query)}`
            },
            {
                title: `${query}的市场分析报告 - 行业研究机构`,
                url: `https://example.com/market/${encodeURIComponent(query)}`
            },
            {
                title: `${query}的临床应用指南 - 医学会`,
                url: `https://example.com/guide/${encodeURIComponent(query)}`
            }
        ];
        
        // 添加搜索结果到列表
        searchResults.forEach(result => {
            addSourceToList(result.title, result.url);
        });
        
        // 添加AI消息
        addMessage(`已为您找到${searchResults.length}条关于"${query}"的相关信息，已添加到信息来源列表中。`, false);
        
        // 清空搜索输入框
        aiSearchInput.value = '';
        
        // 更新AI猜测问题
        updateAISuggestions(query);
    }, 2000);
}

// 上传文件弹窗功能
let uploadFileModal = null;
let closeUploadModalBtn = null;
let cancelUploadBtn = null;
let confirmUploadBtn = null;
let fileInput = null;
let filePreview = null;
let previewFileName = null;
let previewFileSize = null;
let removeFileBtn = null;
let fileToUpload = null;
let uploadNewTab = null;
let selectExistingTab = null;
let uploadNewTabContent = null;
let selectExistingTabContent = null;

// 初始化上传弹窗功能
function initUploadModal() {
    uploadFileModal = document.getElementById('uploadFileModal');
    if (!uploadFileModal) return;
    
    // 获取弹窗元素 - 使用ID直接获取，最可靠的方式
    const openUploadBtn = document.getElementById('openUploadModalBtn');
    
    if (!openUploadBtn) {
        console.warn('未找到上传文件按钮 (openUploadModalBtn)');
        return;
    }
    
    console.log('成功找到上传文件按钮:', openUploadBtn);
    
    closeUploadModalBtn = document.getElementById('closeUploadModal');
    cancelUploadBtn = document.getElementById('cancelUploadBtn');
    confirmUploadBtn = document.getElementById('confirmUploadBtn');
    fileInput = document.getElementById('fileInput');
    filePreview = document.getElementById('filePreview');
    previewFileName = document.getElementById('previewFileName');
    previewFileSize = document.getElementById('previewFileSize');
    removeFileBtn = document.getElementById('removeFileBtn');
    uploadNewTab = document.querySelector('[data-tab="upload-new"]');
    selectExistingTab = document.querySelector('[data-tab="select-existing"]');
    uploadNewTabContent = document.getElementById('upload-new');
    selectExistingTabContent = document.getElementById('select-existing');
    confirmUploadBtn = document.getElementById('confirmUploadBtn');
    
    // 打开弹窗
    openUploadBtn.addEventListener('click', () => {
        uploadFileModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    // 关闭弹窗
    function closeModal() {
        uploadFileModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        resetUploadForm();
    }
    
    closeUploadModalBtn.addEventListener('click', closeModal);
    cancelUploadBtn.addEventListener('click', closeModal);
    
    // 点击弹窗外部关闭
    uploadFileModal.addEventListener('click', (e) => {
        if (e.target === uploadFileModal) {
            closeModal();
        }
    });
    
    // 标签页切换
    uploadNewTab.addEventListener('click', () => {
        uploadNewTab.classList.add('active');
        selectExistingTab.classList.remove('active');
        uploadNewTabContent.classList.add('active');
        selectExistingTabContent.style.display = 'none';
        updateConfirmButtonStatus();
    });
    
    selectExistingTab.addEventListener('click', () => {
        selectExistingTab.classList.add('active');
        uploadNewTab.classList.remove('active');
        selectExistingTabContent.style.display = 'block';
        uploadNewTabContent.classList.remove('active');
        updateConfirmButtonStatus();
    });
    
    // 文件选择处理
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            fileToUpload = file;
            showFilePreview(file);
            updateConfirmButtonStatus();
        }
    });
    
    // 移除文件
    removeFileBtn.addEventListener('click', () => {
        fileToUpload = null;
        hideFilePreview();
        updateConfirmButtonStatus();
        fileInput.value = '';
    });
    
    // 拖放处理
    const uploadArea = document.querySelector('.upload-area');
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('border-blue-500');
    });
    
    uploadArea.addEventListener('dragleave', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('border-blue-500');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('border-blue-500');
        
        const file = e.dataTransfer.files[0];
        if (file) {
            fileToUpload = file;
            showFilePreview(file);
            updateConfirmButtonStatus();
            fileInput.value = '';
        }
    });
    
    // 确认上传
    confirmUploadBtn.addEventListener('click', () => {
        if (confirmUploadBtn.disabled) return;
        
        if (uploadNewTab.classList.contains('active') && fileToUpload) {
            // 模拟上传新文件
            showLoading();
            setTimeout(() => {
                hideLoading();
                addSourceToList(fileToUpload.name, '本地文件');
                addMessage(`已成功上传文件：${fileToUpload.name}`, false);
                closeModal();
            }, 1500);
        } else if (selectExistingTab.classList.contains('active')) {
            // 处理选择现有素材
            const selectedItems = document.querySelectorAll('.material-item.selected');
            if (selectedItems.length > 0) {
                showLoading();
                setTimeout(() => {
                    hideLoading();
                    selectedItems.forEach(item => {
                        const title = item.querySelector('.font-medium').textContent;
                        addSourceToList(title, '素材库');
                        addMessage(`已添加素材：${title}`, false);
                    });
                    closeModal();
                }, 1500);
            }
        }
    });
    
    // 选择现有素材项
    const materialItems = document.querySelectorAll('.material-item');
    materialItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('selected');
            updateConfirmButtonStatus();
        });
    });
}

// 显示文件预览
function showFilePreview(file) {
    filePreview.style.display = 'block';
    previewFileName.textContent = file.name;
    previewFileSize.textContent = formatFileSize(file.size);
}

// 隐藏文件预览
function hideFilePreview() {
    filePreview.style.display = 'none';
}

// 重置上传表单
function resetUploadForm() {
    fileToUpload = null;
    hideFilePreview();
    fileInput.value = '';
    confirmUploadBtn.disabled = true;
    document.querySelectorAll('.material-item.selected').forEach(item => {
        item.classList.remove('selected');
    });
}

// 更新确认按钮状态
function updateConfirmButtonStatus() {
    if (uploadNewTab.classList.contains('active')) {
        confirmUploadBtn.disabled = !fileToUpload;
    } else {
        const selectedItems = document.querySelectorAll('.material-item.selected');
        confirmUploadBtn.disabled = selectedItems.length === 0;
    }
}

// 格式化文件大小
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 添加来源到列表
function addSourceToList(title, url) {
    if (!sourceList) return;
    
    const sourceItem = document.createElement('div');
    sourceItem.className = 'source-item';
    
    sourceItem.innerHTML = `
        <input type="checkbox" class="source-checkbox">
        <div class="source-content">
            <div class="source-title">${title}</div>
            <div class="source-url">${url}</div>
        </div>
    `;
    
    sourceList.appendChild(sourceItem);
}

// 过滤来源列表
function filterSources(searchTerm) {
    if (!sourceList) return;
    
    const sourceItems = sourceList.querySelectorAll('.source-item');
    sourceItems.forEach(item => {
        const title = item.querySelector('.source-title').textContent.toLowerCase();
        const url = item.querySelector('.source-url').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || url.includes(searchTerm)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

// 更新AI猜测问题
function updateAISuggestions(query) {
    if (!aiSuggestions) return;
    
    // 基于搜索关键词生成相关问题
    const suggestions = [
        `${query}的市场前景如何？`,
        `与竞品相比，${query}有哪些优势？`,
        `如何提高${query}的临床使用率？`,
        `${query}的最新研究进展是什么？`,
        `${query}的适用人群有哪些？`
    ];
    
    // 清空现有建议
    aiSuggestions.innerHTML = '';
    
    // 添加新建议
    suggestions.slice(0, 3).forEach(suggestion => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        suggestionItem.setAttribute('data-question', suggestion);
        suggestionItem.textContent = suggestion;
        
        // 添加点击事件
        suggestionItem.addEventListener('click', () => {
            if (userInput && sendBtn) {
                userInput.value = suggestion;
                sendBtn.click();
            }
        });
        
        aiSuggestions.appendChild(suggestionItem);
    });
}

// 产品切换功能
function switchProduct(productId) {
    if (!currentProduct || !productOptionItems) return;
    
    // 更新当前产品ID
    currentProductId = productId;
    
    // 更新当前产品显示
    const product = productsData[productId];
    if (product) {
        currentProduct.textContent = product.name;
    }
    
    // 更新产品选项的active状态
    productOptionItems.forEach(item => {
        const itemProductId = parseInt(item.getAttribute('data-product-id'));
        if (itemProductId === productId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
    
    // 更新产品信息
    updateProductInfo();
    
    // 更新信息来源列表
    updateSourceList();
    
    // 更新AI猜测问题
    updateAISuggestions(product.name);
    
    // 添加AI消息
    addMessage(`已切换至产品：${product.name}，相关资料已更新。`, false);
}

// 更新产品信息
function updateProductInfo() {
    const product = productsData[currentProductId];
    if (!product) return;
    
    // 更新产品信息分类展示
    const categoryContents = document.querySelectorAll('.category-content');
    if (categoryContents.length >= 4) {
        // 基础信息
        const basicInfo = categoryContents[0];
        basicInfo.innerHTML = `
            <div class="info-item">
                <span class="info-label">产品名称：</span>
                <span class="info-value">${product.name}</span>
            </div>
            <div class="info-item">
                <span class="info-label">适应症：</span>
                <span class="info-value">${product.indications}</span>
            </div>
            <div class="info-item">
                <span class="info-label">药理机制：</span>
                <span class="info-value">${product.pathology}</span>
            </div>
        `;
        
        // 区域分析 - 模拟数据
        const regionInfo = categoryContents[1];
        regionInfo.innerHTML = `
            <div class="info-item">
                <span class="info-label">华东地区：</span>
                <span class="info-value">市场份额35%</span>
            </div>
            <div class="info-item">
                <span class="info-label">华南地区：</span>
                <span class="info-value">市场份额28%</span>
            </div>
            <div class="info-item">
                <span class="info-label">华北地区：</span>
                <span class="info-value">市场份额22%</span>
            </div>
        `;
        
        // 市场分析
        const marketInfo = categoryContents[2];
        marketInfo.innerHTML = `
            <div class="info-item">
                <span class="info-label">市场规模：</span>
                <span class="info-value">${product.marketData.split('，')[0].split('：')[1]}</span>
            </div>
            <div class="info-item">
                <span class="info-label">年增长率：</span>
                <span class="info-value">${product.marketData.split('，')[1].split('：')[1]}</span>
            </div>
            <div class="info-item">
                <span class="info-label">主要竞品：</span>
                <span class="info-value">${product.competitiveData.split('：')[1]}</span>
            </div>
        `;
        
        // 竞品分析
        const competitiveInfo = categoryContents[3];
        competitiveInfo.innerHTML = `
            <div class="info-item">
                <span class="info-label">竞品分析：</span>
                <span class="info-value">${product.competitiveData}</span>
            </div>
            <div class="info-item">
                <span class="info-label">竞争优势：</span>
                <span class="info-value">根据临床数据，${product.name}在${product.indications.split('，')[0]}方面表现优异</span>
            </div>
        `;
    }
}

// 更新信息来源列表
function updateSourceList() {
    if (!sourceList) return;
    
    const product = productsData[currentProductId];
    if (!product) return;
    
    // 清空现有列表
    sourceList.innerHTML = '';
    
    // 添加与当前产品相关的信息来源
    const sourceItems = [
        {
            title: `${product.name}的最新研究进展 - 医学期刊网`,
            url: `https://example.com/research/${encodeURIComponent(product.name)}`
        },
        {
            title: `${product.name}的市场分析报告 - 行业研究机构`,
            url: `https://example.com/market/${encodeURIComponent(product.name)}`
        },
        {
            title: `${product.name}的临床应用指南 - 医学会`,
            url: `https://example.com/guide/${encodeURIComponent(product.name)}`
        }
    ];
    
    sourceItems.forEach(item => {
        addSourceToList(item.title, item.url);
    });
}

// 增强的AI回复功能
function simulateAIResponse(userMessage) {
    showLoading();
    
    // 模拟AI思考时间
    setTimeout(() => {
        hideLoading();
        
        // 基于用户输入和左侧产品信息生成更智能的回复
        let aiResponse = aiResponses.default;
        
        // 检查用户输入是否包含产品相关关键词
        const productKeywords = ['产品', '适应症', '病理', '机制', '市场', '竞品', '临床'];
        const containsProductKeyword = productKeywords.some(keyword => 
            userMessage.toLowerCase().includes(keyword)
        );
        
        if (containsProductKeyword) {
            aiResponse = `我已经分析了您的需求，关于"${userMessage}"，我可以为您提供以下帮助：\n1. 生成相关调研问卷\n2. 分析市场趋势\n3. 对比竞品优势\n4. 提供临床应用建议\n\n您希望我优先处理哪一项？`;
        } else if (userMessage.toLowerCase().includes('目的') || userMessage.toLowerCase().includes('目标') || userMessage.toLowerCase().includes('需求')) {
            aiResponse = aiResponses.purpose;
        } else if (userMessage.toLowerCase().includes('问卷')) {
            aiResponse = aiResponses.generate;
            // 自动生成问卷
            generateQuestionnairePreview();
        }
        
        addMessage(aiResponse, false);
    }, 1500);
}

// 页面加载完成后，初始化轮播功能
// 由于header是动态加载的，需要监听DOM变化来初始化轮播功能
function observeHeaderChanges() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;
    
    // 创建MutationObserver来监听header-placeholder的变化
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                // 检查是否有ai-input元素
                const aiInput = document.querySelector('.ai-input');
                if (aiInput) {
                    // 初始化轮播功能
                    initAICarousel();
                    // 停止观察
                    observer.disconnect();
                }
            }
        });
    });
    
    // 配置观察选项
    const config = {
        childList: true,
        subtree: true
    };
    
    // 开始观察
    observer.observe(headerPlaceholder, config);
}

// 当script.js文件加载完成后，初始化轮播功能
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // 直接检查是否有ai-input元素（适用于直接包含header的页面）
        if (document.querySelector('.ai-input')) {
            initAICarousel();
        } else {
            // 监听header-placeholder的变化（适用于动态加载header的页面）
            observeHeaderChanges();
        }
    });
} else {
    // 页面已经加载完成，直接检查
    if (document.querySelector('.ai-input')) {
        initAICarousel();
    } else {
        observeHeaderChanges();
    }
}

