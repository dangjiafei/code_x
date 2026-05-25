// 分页按钮功能
document.addEventListener('DOMContentLoaded', function() {
    const pageBtns = document.querySelectorAll('.page-btn');
    pageBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有活动状态
            pageBtns.forEach(page => page.classList.remove('active'));
            // 添加当前活动状态
            btn.classList.add('active');
        });
    });
});

// 跳转到指定页码功能已移除，因为当前分页组件没有输入框
// 如果需要添加跳转到指定页码功能，请先在HTML中添加对应的输入框元素

// 初始化菜单交互
function initializeMenu() {
    // 根据当前URL设置菜单项激活状态
    const currentUrl = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item');
    
    // 先移除所有菜单项的active状态
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // 然后根据URL匹配设置正确的active状态
    navItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        if (link) {
            const href = link.getAttribute('href');
            
            if (href && href !== '#') {
                if (href === 'index.html') {
                    // 首页的特殊处理
                    if (currentUrl === '/html/' || currentUrl === '/html/index.html') {
                        item.classList.add('active');
                    }
                } else if (href === 'activity-management.html') {
                    // 活动管理页面的处理
                    if (currentUrl.endsWith('activity-management.html') ||
                        currentUrl.endsWith('podcast-detail.html') ||
                        currentUrl.endsWith('case-collection-detail.html') ||
                        currentUrl.endsWith('create-case.html') ||
                        currentUrl.endsWith('case-detail.html')) {
                        item.classList.add('active');
                    }
                } else {
                    // 通用处理：检查当前URL是否以href结尾
                    if (currentUrl.endsWith(href)) {
                        item.classList.add('active');
                    }
                }
            }
        }
    });
    
    // 导航菜单点击事件处理
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // 阻止默认跳转行为
            if (href === '#') {
                e.preventDefault();
            } else if (href && !href.startsWith('http')) {
                // 对于内部链接，允许默认跳转行为
                // 但先更新菜单状态，这样页面刷新后状态会由URL匹配逻辑处理
                const navItems = document.querySelectorAll('.nav-item');
                navItems.forEach(item => item.classList.remove('active'));
                
                const currentNavItem = link.closest('.nav-item');
                if (currentNavItem) {
                    currentNavItem.classList.add('active');
                }
            }
        });
    });
    
    // 下拉菜单功能
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    dropdownItems.forEach(item => {
        const link = item.querySelector('.nav-link');
        const subNav = item.querySelector('.sub-nav');
        
        if (link && subNav) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // 切换子导航显示状态
                subNav.classList.toggle('show');
                // 切换活动状态
                item.classList.toggle('active');
            });
        }
    });
}

// 服务标签切换功能
function initializeServiceTabs() {
    const serviceTabs = document.querySelectorAll('.service-tab');
    const filterBars = document.querySelectorAll('.filter-bar');
    const tabContents = document.querySelectorAll('.tab-content');
    const recordTabsContainers = document.querySelectorAll('.record-tabs');

    serviceTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // 获取当前标签的索引
            const index = Array.from(serviceTabs).indexOf(tab);
            const targetId = tab.getAttribute('data-target');
            
            // 移除所有标签的active状态
            serviceTabs.forEach(t => t.classList.remove('active'));
            // 为当前标签添加active状态
            tab.classList.add('active');

            if (targetId) {
                filterBars.forEach(bar => {
                    bar.style.display = 'none';
                    bar.classList.remove('active');
                });

                const targetFilter = document.querySelector(`[data-filter-for="${targetId}"]`);
                if (targetFilter) {
                    targetFilter.style.display = 'flex';
                    targetFilter.classList.add('active');
                }

                tabContents.forEach(content => {
                    content.style.display = 'none';
                    content.classList.remove('active');
                });

                const targetContent = document.getElementById(targetId);
                if (targetContent) {
                    targetContent.style.display = 'block';
                    targetContent.classList.add('active');
                }

                recordTabsContainers.forEach(container => {
                    container.style.display = 'none';
                    container.classList.remove('active');
                });

                const targetRecordTabs = document.querySelector(`[data-record-for="${targetId}"]`);
                if (targetRecordTabs) {
                    targetRecordTabs.style.display = 'flex';
                    targetRecordTabs.classList.add('active');
                }

                return;
            }
            
            // 移除所有筛选栏的active状态和显示
            filterBars.forEach(bar => {
                bar.style.display = 'none';
                bar.classList.remove('active');
            });
            // 显示对应索引的筛选栏
            if (filterBars[index]) {
                filterBars[index].style.display = 'flex';
                filterBars[index].classList.add('active');
            }
            
            // 移除所有内容区域的active状态和显示
            tabContents.forEach(content => {
                content.style.display = 'none';
                content.classList.remove('active');
            });
            // 显示对应索引的内容区域
            if (tabContents[index]) {
                tabContents[index].style.display = 'block';
                tabContents[index].classList.add('active');
            }
            
            // 切换对应的状态标签
            recordTabsContainers.forEach(container => {
                container.style.display = 'none';
                container.classList.remove('active');
            });
            
            // 根据服务类型显示对应的状态标签
            if (index === 0) {
                // 医学播客
                const medicalPodcastTabs = document.querySelector('.medical-podcast-tabs');
                if (medicalPodcastTabs) {
                    medicalPodcastTabs.style.display = 'flex';
                    medicalPodcastTabs.classList.add('active');
                }
            } else if (index === 1) {
                // 在线互动病例征集
                const caseCollectionTabs = document.querySelector('.case-collection-tabs');
                if (caseCollectionTabs) {
                    caseCollectionTabs.style.display = 'flex';
                    caseCollectionTabs.classList.add('active');
                }
            } else if (index === 2) {
                // 市场活动
                const marketingTabs = document.querySelector('.marketing-tabs');
                if (marketingTabs) {
                    marketingTabs.style.display = 'flex';
                    marketingTabs.classList.add('active');
                }
            }
        });
    });
}

// 记录标签切换功能
function initializeRecordTabs() {
    // 为每个记录标签容器添加事件监听器
    const recordTabsContainers = document.querySelectorAll('.record-tabs');
    
    recordTabsContainers.forEach(container => {
        const recordTabs = container.querySelectorAll('.record-tab');
        
        recordTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // 移除当前容器中所有标签的active状态
                recordTabs.forEach(t => t.classList.remove('active'));
                // 为当前标签添加active状态
                tab.classList.add('active');
                
                // 获取当前激活的服务内容区域
                const activeContent = document.querySelector('.tab-content.active');
                if (!activeContent) return;
                
                // 获取要筛选的状态
                const status = tab.getAttribute('data-status');
                
                // 筛选表格行
                const tableRows = activeContent.querySelectorAll('.record-table tbody tr');
                
                tableRows.forEach(row => {
                    // 获取当前行的状态
                    const statusElement = row.querySelector('.status');
                    if (!statusElement) return;
                    
                    let rowStatus = '';
                    const statusText = statusElement.textContent.trim();
                    
                    // 映射状态文本到数据状态
                    if (statusText === '可参加') {
                        rowStatus = 'available';
                    } else if (statusText === '待投稿') {
                        rowStatus = 'pending';
                    } else if (statusText === '审核中') {
                        rowStatus = 'reviewing';
                    } else if (statusText === '未通过' || statusText === '审核失败') {
                        rowStatus = 'failed';
                    } else if (statusText === '已完成') {
                        rowStatus = 'completed';
                    }
                    
                    // 根据筛选条件显示或隐藏行
                    if (status === 'all' || rowStatus === status) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            });
        });
    });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    initializeMenu();
    initializeServiceTabs();
    initializeRecordTabs();
});

// 病例创建页面相关功能

// 添加题目功能
function addQuestion(moduleId, questionType = 'single') {
    console.log('添加题目到模块:', moduleId, '题目类型:', questionType);
    // 这里可以添加题目到指定模块的逻辑
}

// 添加分页器功能
function addPaginator(moduleId) {
    console.log('在模块后添加分页器:', moduleId);
    
    // 查找对应模块的题目列表
    const questionsList = document.getElementById(moduleId + '-questions');
    if (questionsList) {
        // 创建分页器元素
        const paginator = document.createElement('div');
        paginator.className = 'paginator';
        paginator.style.cssText = `
            margin: 20px 0;
            padding: 16px;
            background-color: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            text-align: center;
        `;
        
        // 添加分页器内容
        paginator.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; gap: 8px;">
                <button class="page-btn" style="padding: 6px 12px; border: 1px solid #d1d5db; border-radius: 4px; background-color: white; cursor: pointer;">上一页</button>
                <span style="margin: 0 8px;">第 1 页，共 1 页</span>
                <button class="page-btn" style="padding: 6px 12px; border: 1px solid #d1d5db; border-radius: 4px; background-color: white; cursor: pointer;">下一页</button>
            </div>
        `;
        
        // 绑定点击事件
        const pageBtns = paginator.querySelectorAll('.page-btn');
        pageBtns.forEach((btn, index) => {
            btn.addEventListener('click', () => {
                changePage(btn, index + 1);
            });
        });
        
        // 添加到题目列表中
        questionsList.appendChild(paginator);
        
        // 显示成功提示
        showNotification('成功添加分页器', 'success');
    } else {
        console.error('未找到题目列表元素:', moduleId + '-questions');
        showNotification('添加分页器失败：未找到题目列表', 'error');
    }
}

// 切换页码功能
function changePage(button, pageNum) {
    console.log('切换到页码:', pageNum);
    // 这里可以添加切换页码的逻辑
    
    // 模拟页码切换效果
    const paginator = button.closest('.paginator');
    if (paginator) {
        const pageInfo = paginator.querySelector('span');
        if (pageInfo) {
            pageInfo.textContent = `第 ${pageNum} 页，共 2 页`;
        }
        
        // 更新按钮状态
        const pageBtns = paginator.querySelectorAll('.page-btn');
        pageBtns.forEach(btn => {
            btn.style.backgroundColor = 'white';
        });
        button.style.backgroundColor = '#e0f2fe';
    }
}

// 显示通知功能
function showNotification(message, type = 'success') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `notification ${type} show`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 16px 24px;
        border-radius: 8px;
        color: white;
        font-size: 14px;
        font-weight: 500;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    
    // 设置不同类型的背景色
    if (type === 'success') {
        notification.style.backgroundColor = '#10b981';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#ef4444';
    } else if (type === 'warning') {
        notification.style.backgroundColor = '#f59e0b';
    }
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 显示通知
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 3秒后隐藏通知
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// 创建WeakMap来存储菜单和目标元素之间的关联
const menuTargetMap = new WeakMap();

// 题目菜单显示/隐藏功能
function showQuestionMenu(element) {
    // 移除所有现有的菜单
    document.querySelectorAll('.question-type-menu').forEach(menu => {
        menu.style.display = 'none';
    });
    
    const menu = element.nextElementSibling;
    if (menu && menu.classList.contains('question-type-menu')) {
        // 获取按钮的位置信息
        const rect = element.getBoundingClientRect();
        
        // 移除所有内联样式，确保完全由JavaScript控制
        menu.removeAttribute('style');
        
        // 设置菜单样式
        menu.style.display = 'block';
        menu.style.position = 'fixed';
        menu.style.top = rect.bottom + window.scrollY + 'px';
        menu.style.left = rect.left + window.scrollX + 'px';
        menu.style.width = '180px';
        menu.style.backgroundColor = 'white';
        menu.style.border = '1px solid #e2e8f0';
        menu.style.borderRadius = '6px';
        menu.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        menu.style.zIndex = '999999';
        menu.style.overflow = 'visible';
        menu.style.minHeight = '200px';
        menu.style.maxHeight = '300px';
        menu.style.padding = '0';
        menu.style.margin = '0';
        menu.style.listStyle = 'none';
        
        // 将菜单移动到body的直接子元素中，避免受到父元素的限制
        document.body.appendChild(menu);
        
        // 确保菜单中的所有子元素都能正确显示
        const menuItems = menu.querySelectorAll('.menu-item');
        menuItems.forEach(item => {
            item.style.display = 'block';
            item.style.padding = '10px 16px';
            item.style.cursor = 'pointer';
            item.style.fontSize = '14px';
            item.style.color = '#374151';
            item.style.transition = 'all 0.2s ease';
            item.style.display = 'flex';
            item.style.alignItems = 'center';
            item.style.gap = '8px';
            
            // 为菜单项添加悬停效果
            item.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#f1f5f9';
            });
            item.addEventListener('mouseleave', function() {
                this.style.backgroundColor = 'transparent';
            });
        });
        
        // 存储菜单和目标元素之间的关联
        menuTargetMap.set(menu, element);
    }
}

function hideQuestionMenu(element) {
    // 找到所有的题目类型菜单
    const menus = document.querySelectorAll('.question-type-menu');
    menus.forEach(menu => {
        // 隐藏菜单
        menu.style.display = 'none';
        
        // 如果菜单有存储的目标元素，将其恢复到目标元素的后面
        const targetElement = menuTargetMap.get(menu);
        if (targetElement) {
            // 将菜单插入到目标元素的后面
            targetElement.parentNode.insertBefore(menu, targetElement.nextSibling);
            // 清除存储的关联
            menuTargetMap.delete(menu);
        }
    });
}

// 自动保存功能
function autoSave() {
    console.log('自动保存中...');
    // 这里可以添加自动保存的逻辑
}
