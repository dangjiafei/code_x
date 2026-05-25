document.addEventListener('DOMContentLoaded', function() {
    initStepNavigation();
    initThemeManagement();
    initRequirementManagement();
    initActivityScope();
    initDurationOptions();
    initThemePlanningTools();
    initDomainModal();
    initFormValidation();
    initSaveDraft();
    initSubmit();
    initCoverUpload();
    initDateValidation();
    initPurchaseLimitValidation();
    initWordLimitValidation();
    initAcademicExpression();
    initDesignControls();
});

function initStepNavigation() {
    const stepItems = document.querySelectorAll('.step-item');
    const formSteps = document.querySelectorAll('.form-step');

    stepItems.forEach(item => {
        item.addEventListener('click', function() {
            const step = parseInt(this.dataset.step);
            showStep(step);
        });
    });

    document.querySelectorAll('.next-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const currentStep = parseInt(this.dataset.step);
            if (validateStep(currentStep)) {
                showStep(currentStep + 1);
            }
        });
    });

    document.querySelectorAll('.prev-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const currentStep = parseInt(this.dataset.step);
            showStep(currentStep - 1);
        });
    });

    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const step = parseInt(this.dataset.step);
            showStep(step);
        });
    });
}

function showStep(step) {
    document.querySelectorAll('.step-item').forEach(item => {
        item.classList.remove('active');
    });
    document.querySelectorAll('.form-step').forEach(formStep => {
        formStep.classList.remove('active');
    });

    document.querySelector(`.step-item[data-step="${step}"]`).classList.add('active');
    document.getElementById(`step${step}`).classList.add('active');

    if (step === 4) {
        const hasData = hasFormData();
        if (hasData) {
            generateAcademicExpression(false);
            updateAIPreview();
        }
    } else if (step === 3) {
        generateAcademicExpression(false);
        updateDoctorExpressionPreview();
    } else if (step === 2) {
        updateThemeCounts();
        updateRequirementCount();
    }
}

function hasFormData() {
    const name = document.getElementById('activityName').value.trim();
    const background = document.getElementById('activityBackground')?.value.trim() || '';
    const purpose = document.getElementById('activityPurpose')?.value.trim() || '';
    return name || background || purpose;
}

function getSelectedText(selectId, fallback = '') {
    const select = document.getElementById(selectId);
    if (!select || select.selectedIndex < 0) return fallback;
    return select.options[select.selectedIndex].text || fallback;
}

function collectRequirements() {
    return Array.from(document.querySelectorAll('.requirement-card'))
        .map(card => {
            const label = card.querySelector('.requirement-label-input')?.value.trim();
            const content = card.querySelector('.requirement-content-input')?.value.trim();
            if (label && content) return `${label}：${content}`;
            return content || '';
        })
        .filter(Boolean);
}

function getThemeTypeName(type) {
    const typeMap = {
        'medical-podcast': '医学播客',
        'surgery-video': '手术/操作视频',
        'online-case': '在线互动病例'
    };
    return typeMap[type] || '征稿主题';
}

function collectThemes() {
    const themes = [];
    document.querySelectorAll('.theme-card').forEach(card => {
        const type = card.closest('.type-theme-card')?.dataset.type || '';
        themes.push({
            type,
            typeName: getThemeTypeName(type),
            name: card.querySelector('.theme-name')?.value.trim() || '',
            desc: card.querySelector('.theme-desc')?.value.trim() || '',
            focus: card.querySelector('.theme-focus')?.value.trim() || ''
        });
    });
    return themes;
}

function getCheckedValues(selector) {
    return Array.from(document.querySelectorAll(selector))
        .filter(input => input.checked)
        .map(input => input.value);
}

function buildClinicalQuestionOptions() {
    const name = document.getElementById('activityName')?.value.trim() || '本次学术征集活动';
    const domain = getSelectedText('activityDomain', '相关医学领域').replace('请选择医学领域', '相关医学领域');
    const themes = collectThemes().filter(theme => theme.name || theme.desc);
    const primaryTheme = themes[0]?.name || domain;
    const primaryFocus = themes[0]?.focus || themes[0]?.desc || '诊疗判断、治疗取舍和复盘思考';
    const mode = document.getElementById('expressionMode')?.value || 'academic';

    const baseOptions = {
        clinical: [
            `${primaryTheme}中，哪些真实诊疗判断值得被系统复盘并分享给同行？`,
            `${domain}诊疗实践中，医生如何处理指南之外的复杂场景和方案调整？`,
            `围绕${primaryFocus}，一线医生有哪些可被同行借鉴的判断依据和复盘经验？`
        ],
        challenge: [
            `${primaryTheme}中的复杂病例，关键诊疗选择如何影响最终治疗路径？`,
            `${domain}疑难场景中，医生如何识别风险并做出关键判断？`,
            `面对${primaryFocus}，哪些临床决策最需要通过真实病例被讨论？`
        ],
        expert: [
            `${primaryTheme}相关诊疗经验中，哪些内容值得被系统复盘？`,
            `${domain}实践中，哪些真实经验适合形成更可讨论的学术内容？`,
            `围绕${primaryFocus}，哪些真实经验适合形成可传播内容？`
        ],
        growth: [
            `${primaryTheme}相关病例中，哪些诊疗思路最值得年轻医生学习？`,
            `${domain}真实诊疗场景里，医生如何建立完整的临床判断路径？`,
            `围绕${primaryFocus}，资深医生有哪些经验可以帮助年轻医生少走弯路？`
        ]
    };

    return baseOptions[mode] || baseOptions.clinical;
}

function renderClinicalQuestionOptions() {
    const container = document.getElementById('clinicalQuestionOptions');
    if (!container) return;

    const currentQuestion = document.getElementById('expressionMission')?.value.trim();
    const options = buildClinicalQuestionOptions();
    container.innerHTML = '';

    options.forEach((question, index) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'clinical-question-option';
        if ((!currentQuestion && index === 0) || currentQuestion === question) {
            btn.classList.add('active');
        }
        btn.textContent = question;
        btn.addEventListener('click', function() {
            applyClinicalQuestion(question);
        });
        container.appendChild(btn);
    });
}

function applyClinicalQuestion(question) {
    const expression = buildAcademicExpression(question);
    setFieldValueIfEmpty('expressionMission', expression.mission, true);
    setFieldValueIfEmpty('expressionProblem', expression.problem, true);
    setFieldValueIfEmpty('expressionDoctorValue', expression.doctorValue, true);
    renderClinicalQuestionOptions();
    updateDoctorExpressionPreview();
}

function buildAcademicExpression(questionOverride = '') {
    const name = document.getElementById('activityName')?.value.trim() || '本次学术征集活动';
    const domain = getSelectedText('activityDomain', '相关医学领域').replace('请选择医学领域', '相关医学领域');
    const themes = collectThemes().filter(theme => theme.name || theme.desc);
    const themeNames = getOverviewThemeNames(themes, domain);
    const focusKeywords = getOverviewFocusKeywords(themes);

    const mission = `围绕${domain}真实世界诊疗经验，征集可复盘、可交流的内容`;
    const problem = `本期主题覆盖${themeNames.join('、')}等方向，适合结合真实病例讲清${focusKeywords.join('、')}。`;
    const doctorValue = themeNames.join('、');

    return { mission, problem, doctorValue };
}

function getOverviewThemeNames(themes, domain) {
    const names = themes
        .map(theme => theme.name)
        .filter(Boolean)
        .slice(0, 5);

    if (names.length) return names;

    if (domain.includes('心血管')) {
        return ['冠心病诊疗', '心力衰竭管理', '心律失常诊治', '复杂冠脉介入', '起搏器植入'];
    }

    return [`${domain}诊疗经验`, `${domain}复杂病例`, `${domain}长期管理`];
}

function getOverviewFocusKeywords(themes) {
    const focusText = themes
        .map(theme => theme.focus || theme.desc)
        .filter(Boolean)
        .join('、');

    const defaults = ['诊疗判断', '操作要点', '风险处理', '长期管理经验'];
    const candidates = ['诊断依据', '治疗取舍', '随访管理', '操作要点', '风险控制', '并发症处理', '患者教育', '复盘思考'];
    const hits = candidates.filter(keyword => focusText.includes(keyword));
    return (hits.length ? hits : defaults).slice(0, 4);
}

function setFieldValueIfEmpty(id, value, force = false) {
    const field = document.getElementById(id);
    if (!field) return;
    if (force || !field.value.trim()) {
        field.value = value;
    }
}

function generateAcademicExpression(force = false) {
    renderClinicalQuestionOptions();
    const expression = buildAcademicExpression();
    setFieldValueIfEmpty('expressionMission', expression.mission, force);
    setFieldValueIfEmpty('expressionProblem', expression.problem, force);
    setFieldValueIfEmpty('expressionDoctorValue', expression.doctorValue, force);
    renderClinicalQuestionOptions();
    renderOverviewDirectionTags();
    updateDoctorExpressionPreview();
}

function parseOverviewDirections() {
    const value = document.getElementById('expressionDoctorValue')?.value.trim() || '';
    return value
        .split(/[、，,]/)
        .map(item => item.trim())
        .filter(Boolean);
}

function saveOverviewDirections(tags) {
    const field = document.getElementById('expressionDoctorValue');
    if (!field) return;
    const uniqueTags = Array.from(new Set(tags.map(tag => tag.trim()).filter(Boolean)));
    field.value = uniqueTags.join('、');
    updateDoctorExpressionPreview();
}

function renderOverviewDirectionTags() {
    const container = document.getElementById('overviewDirectionTags');
    if (!container) return;

    const tags = parseOverviewDirections();
    container.innerHTML = '';

    if (!tags.length) {
        const empty = document.createElement('span');
        empty.className = 'overview-direction-empty';
        empty.textContent = '暂无覆盖方向，请点击 AI 一键生成概览或手动添加。';
        container.appendChild(empty);
        return;
    }

    tags.forEach(tag => {
        const chip = document.createElement('span');
        chip.className = 'overview-direction-tag';
        chip.innerHTML = `${tag}<button type="button" aria-label="删除${tag}">×</button>`;
        chip.querySelector('button').addEventListener('click', function() {
            saveOverviewDirections(tags.filter(item => item !== tag));
            renderOverviewDirectionTags();
        });
        container.appendChild(chip);
    });
}

function addOverviewDirectionTag() {
    const input = document.getElementById('overviewDirectionInput');
    if (!input) return;
    const value = input.value.trim();
    if (!value) return;
    saveOverviewDirections([...parseOverviewDirections(), value]);
    input.value = '';
    renderOverviewDirectionTags();
}

function renderThemeValueList(force = false) {
    const container = document.getElementById('themeValueList');
    if (!container) return;

    const existingValues = {};
    container.querySelectorAll('.theme-value-input').forEach(input => {
        existingValues[input.dataset.themeKey] = input.value;
    });

    const themes = collectThemes().filter(theme => theme.name || theme.desc);
    const fallbackThemes = themes.length ? themes : [
        { typeName: '医学播客', name: '冠心病诊疗新进展', desc: '分享冠心病诊疗经验。' }
    ];

    container.innerHTML = '';
    fallbackThemes.forEach((theme, index) => {
        const key = `${theme.typeName}-${theme.name || index}`;
        const value = !force && existingValues[key]
            ? existingValues[key]
            : `征集${theme.name || theme.typeName}方向的真实经验，重点呈现诊疗依据、处理过程和复盘思考，帮助同行理解该主题下的临床决策。`;

        const item = document.createElement('div');
        item.className = 'theme-value-item';
        item.innerHTML = `
            <div class="theme-value-name">${theme.typeName}<br>${theme.name || '未命名主题'}</div>
            <textarea class="form-input theme-value-input" data-theme-key="${key}" rows="3">${value}</textarea>
        `;
        container.appendChild(item);
    });

    container.querySelectorAll('.theme-value-input').forEach(input => {
        input.addEventListener('input', function() {
            updateDoctorExpressionPreview();
            updateAIPreview();
        });
    });
}

function updateDoctorExpressionPreview() {
    const name = document.getElementById('activityName')?.value.trim() || '心血管疾病病例征稿活动';
    const mission = document.getElementById('expressionMission')?.value.trim() || '围绕心血管真实世界诊疗经验，征集可复盘、可交流的内容。';
    const problem = document.getElementById('expressionProblem')?.value.trim() || '系统会根据活动主题自动生成概览说明。';
    const value = document.getElementById('expressionDoctorValue')?.value.trim() || '系统会根据主题名称生成覆盖方向。';
    const direction = value || '系统会根据主题名称生成覆盖方向。';

    const titleEl = document.getElementById('doctorPreviewTitle');
    const missionEl = document.getElementById('doctorPreviewMission');
    const problemEl = document.getElementById('doctorPreviewProblem');
    const valueEl = document.getElementById('doctorPreviewValue');
    const outcomeEl = document.getElementById('doctorPreviewOutcome');

    if (titleEl) titleEl.textContent = name;
    if (missionEl) missionEl.textContent = mission;
    if (problemEl) problemEl.textContent = problem;
    if (valueEl) valueEl.textContent = value;
    if (outcomeEl) outcomeEl.textContent = direction;

    applyModuleVisibility('.doctor-preview-card', getCheckedValues('.doctor-module-toggle'));
}

function initAcademicExpression() {
    const generateBtn = document.getElementById('generateExpressionBtn');
    const modeSelect = document.getElementById('expressionMode');
    const refreshThemeBtn = document.getElementById('refreshThemeValueBtn');
    const addDirectionBtn = document.getElementById('addOverviewDirectionBtn');
    const directionInput = document.getElementById('overviewDirectionInput');

    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            generateAcademicExpression(true);
        });
    }

    if (modeSelect) {
        modeSelect.addEventListener('change', function() {
            generateAcademicExpression(true);
        });
    }

    if (refreshThemeBtn) {
        refreshThemeBtn.addEventListener('click', function() {
            renderThemeValueList(true);
        });
    }

    if (addDirectionBtn) {
        addDirectionBtn.addEventListener('click', addOverviewDirectionTag);
    }

    if (directionInput) {
        directionInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                addOverviewDirectionTag();
            }
        });
    }

    document.querySelectorAll('.expression-textarea').forEach(field => {
        field.addEventListener('input', function() {
            if (field.id === 'expressionMission') {
                renderClinicalQuestionOptions();
            }
            updateDoctorExpressionPreview();
        });
    });

    document.querySelectorAll('.doctor-module-toggle').forEach(input => {
        input.addEventListener('change', updateDoctorExpressionPreview);
    });

    document.querySelectorAll('.expression-mini-btn[data-polish]').forEach(btn => {
        btn.addEventListener('click', function() {
            const target = this.dataset.polish;
            const targetMap = {
                mission: 'expressionMission',
                problem: 'expressionProblem',
                doctorValue: 'expressionDoctorValue'
            };
            const field = document.getElementById(targetMap[target]);
            if (!field) return;
            const expression = buildAcademicExpression();
            const nextValue = {
                mission: expression.mission,
                problem: expression.problem,
                doctorValue: expression.doctorValue
            }[target];
            field.value = nextValue;
            updateDoctorExpressionPreview();
        });
    });

    renderClinicalQuestionOptions();
    generateAcademicExpression(false);
    renderOverviewDirectionTags();
}

function initThemeManagement() {
    document.querySelectorAll('.type-theme-card').forEach(card => {
        const header = card.querySelector('.type-card-header');
        header.addEventListener('click', function() {
            const type = card.dataset.type;
            document.querySelectorAll('.type-theme-card').forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });

    document.querySelectorAll('.add-theme-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const type = this.dataset.type;
            const themeList = document.querySelector(`.theme-list[data-type="${type}"]`);
            const themeCount = themeList.children.length;
            if (themeCount >= 10) {
                alert('每种类型最多只能添加10个主题');
                return;
            }

            const newIndex = themeCount;
            const newCard = createThemeCard(type, newIndex);
            themeList.appendChild(newCard);
            updateThemeActions(type);
            bindThemeActionEvents(newCard, type);
            bindThemeInputEvents(newCard);
            updateThemeCounts();
        });
    });

    document.querySelectorAll('.theme-card').forEach(card => {
        const type = card.closest('.type-theme-card')?.dataset.type;
        if (type) {
            bindThemeActionEvents(card, type);
            bindThemeInputEvents(card);
        }
    });

    updateThemeCounts();
}

function createThemeCard(type, index, data = {}) {
    const newCard = document.createElement('div');
    newCard.className = 'theme-card';
    newCard.dataset.index = index;
    newCard.innerHTML = `
        <div class="theme-header">
            <div>
                <span class="theme-number">主题 ${index + 1}</span>
                <span class="theme-type-label">${getThemeTypeName(type)}</span>
            </div>
            <div class="theme-actions">
                <button class="theme-action-btn move-up">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="18 15 12 9 6 15"></polyline>
                    </svg>
                </button>
                <button class="theme-action-btn move-down">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>
                <button class="theme-action-btn remove">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M3 6h18"></path>
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        </div>
        <div class="theme-form">
            <input type="text" class="form-input theme-name" placeholder="主题名称，例如：冠心病诊疗决策复盘" maxlength="30" value="${data.name || ''}">
            <textarea class="form-input theme-desc" placeholder="主题说明：医生围绕什么临床方向展开创作，边界是什么。" maxlength="200">${data.desc || ''}</textarea>
            <input type="text" class="form-input theme-focus" placeholder="创作重点，例如：诊断依据、治疗取舍、随访管理" value="${data.focus || ''}">
        </div>
    `;

    return newCard;
}

function bindThemeInputEvents(card) {
    card.querySelectorAll('.theme-name, .theme-desc, .theme-focus').forEach(input => {
        input.addEventListener('input', function() {
            generateAcademicExpression(false);
        });
    });
}

function updateThemeCounts() {
    let totalCount = 0;
    
    document.querySelectorAll('.type-theme-card').forEach(card => {
        const type = card.dataset.type;
        const themeList = document.querySelector(`.theme-list[data-type="${type}"]`);
        const count = themeList ? themeList.children.length : 0;
        const countBadge = card.querySelector('.theme-count-badge');
        if (countBadge) {
            countBadge.textContent = count;
        }
        totalCount += count;
    });
    
    const totalCountEl = document.getElementById('totalThemesCount');
    if (totalCountEl) {
        totalCountEl.textContent = totalCount;
    }

    const activeTypeCountEl = document.getElementById('activeTypeCount');
    if (activeTypeCountEl) {
        const activeTypeCount = Array.from(document.querySelectorAll('.type-theme-card'))
            .filter(card => {
                const type = card.dataset.type;
                const themeList = document.querySelector(`.theme-list[data-type="${type}"]`);
                return themeList && themeList.children.length > 0;
            }).length;
        activeTypeCountEl.textContent = `${activeTypeCount} 类`;
    }
}

function bindThemeActionEvents(card, type) {
    const moveUpBtn = card.querySelector('.move-up');
    const moveDownBtn = card.querySelector('.move-down');
    const removeBtn = card.querySelector('.remove');

    moveUpBtn.addEventListener('click', function() {
        moveTheme(card, -1, type);
    });

    moveDownBtn.addEventListener('click', function() {
        moveTheme(card, 1, type);
    });

    removeBtn.addEventListener('click', function() {
        removeTheme(card, type);
    });
}

function moveTheme(card, direction, type) {
    const themeList = document.querySelector(`.theme-list[data-type="${type}"]`);
    const cards = Array.from(themeList.children);
    const currentIndex = cards.indexOf(card);
    const newIndex = currentIndex + direction;

    if (newIndex >= 0 && newIndex < cards.length) {
        themeList.insertBefore(card, cards[newIndex]);
        updateThemeActions(type);
    }
}

function removeTheme(card, type) {
    const totalThemes = document.querySelectorAll('.theme-card').length;
    if (totalThemes <= 1) {
        alert('至少需要保留1个主题');
        return;
    }
    card.remove();
    updateThemeActions(type);
    updateThemeCounts();
}

function updateThemeActions(type) {
    const themeList = document.querySelector(`.theme-list[data-type="${type}"]`);
    const cards = themeList.children;

    Array.from(cards).forEach((card, index) => {
        const moveUpBtn = card.querySelector('.move-up');
        const moveDownBtn = card.querySelector('.move-down');
        const removeBtn = card.querySelector('.remove');
        const numberSpan = card.querySelector('.theme-number');

        moveUpBtn.disabled = index === 0;
        moveDownBtn.disabled = index === cards.length - 1;
        removeBtn.disabled = cards.length <= 1;
        numberSpan.textContent = `主题 ${index + 1}`;
        const typeLabel = card.querySelector('.theme-type-label');
        if (typeLabel) {
            typeLabel.textContent = getThemeTypeName(type);
        }
        card.dataset.index = index;
    });
}

function initRequirementManagement() {
    const requirementList = document.getElementById('requirementList');
    
    requirementList.addEventListener('click', function(e) {
        const target = e.target;
        
        if (target.classList.contains('add-btn')) {
            addRequirement(target.closest('.requirement-card'));
        } else if (target.classList.contains('delete-btn')) {
            removeRequirement(target.closest('.requirement-card'));
        }
    });

    requirementList.addEventListener('input', function(e) {
        if (e.target.classList.contains('requirement-label-input') || e.target.classList.contains('requirement-content-input')) {
            updateRequirementCount();
        }
    });
    
    updateRequirementActions();
    updateRequirementCount();
}

function addRequirement(card) {
    const requirementList = document.getElementById('requirementList');
    const newCard = document.createElement('div');
    newCard.className = 'requirement-card';
    newCard.innerHTML = `
        <div class="requirement-row">
            <input type="text" class="requirement-label-input" placeholder="标签名称">
            <span class="requirement-colon">：</span>
            <input type="text" class="requirement-content-input" placeholder="详细内容">
        </div>
        <div class="requirement-actions">
            <button class="requirement-btn add-btn">新增</button>
            <button class="requirement-btn delete-btn">删除</button>
        </div>
    `;
    
    card.parentNode.insertBefore(newCard, card.nextSibling);
    updateRequirementActions();
    updateRequirementCount();
}

function removeRequirement(card) {
    const requirementList = document.getElementById('requirementList');
    if (requirementList.children.length <= 1) {
        return;
    }
    card.remove();
    updateRequirementActions();
    updateRequirementCount();
}

function updateRequirementActions() {
    const requirementList = document.getElementById('requirementList');
    const cards = requirementList.children;
    
    Array.from(cards).forEach((card) => {
        const deleteBtn = card.querySelector('.delete-btn');
        deleteBtn.disabled = cards.length <= 1;
    });
}

function updateRequirementCount() {
    const requirementCountEl = document.getElementById('requirementCount');
    if (requirementCountEl) {
        requirementCountEl.textContent = `${collectRequirements().length} 条`;
    }
}

function initThemePlanningTools() {
    const generateBtn = document.getElementById('generateThemePlanBtn');
    const requirementBtn = document.getElementById('fillRequirementBtn');

    if (generateBtn) {
        generateBtn.addEventListener('click', function() {
            fillThemeSuggestions();
        });
    }

    if (requirementBtn) {
        requirementBtn.addEventListener('click', function() {
            fillRequirementDefaults();
        });
    }
}

function buildThemeSuggestions() {
    const domainText = getSelectedText('activityDomain', '心血管疾病').replace('请选择医学领域', '心血管疾病');
    const name = document.getElementById('activityName')?.value.trim() || `${domainText}学术征集`;

    if (domainText.includes('心血管')) {
        return [
            {
                type: 'medical-podcast',
                name: '冠心病诊疗决策复盘',
                desc: '围绕冠心病诊断、治疗路径选择和长期管理，分享真实病例中的判断依据与复盘思考。',
                focus: '诊断依据、治疗取舍、长期随访管理',
                output: '15-20分钟音频/视频讲述'
            },
            {
                type: 'medical-podcast',
                name: '心力衰竭综合管理',
                desc: '聚焦心衰患者的药物规范化使用、器械治疗选择、长期随访和患者教育经验。',
                focus: '分层管理、方案调整、患者依从性',
                output: '15-20分钟经验复盘'
            },
            {
                type: 'online-case',
                name: '复杂心律失常互动病例',
                desc: '通过病例推演呈现心律失常诊断、风险评估和治疗选择中的关键节点。',
                focus: '诊疗选择、风险判断、互动问答',
                output: '在线互动病例脚本'
            }
        ];
    }

    return [
        {
            type: 'medical-podcast',
            name: `${domainText}诊疗经验复盘`,
            desc: `围绕${domainText}常见诊疗场景，分享真实病例中的判断依据、治疗过程和复盘思考。`,
            focus: '诊断思路、治疗取舍、经验启发',
            output: '15-20分钟音频/视频讲述'
        },
        {
            type: 'online-case',
            name: `${domainText}复杂病例推演`,
            desc: `通过互动病例呈现${domainText}复杂患者的诊疗选择和关键决策节点。`,
            focus: '病例推演、风险判断、互动问答',
            output: '在线互动病例脚本'
        },
        {
            type: 'medical-podcast',
            name: `${name}优秀经验分享`,
            desc: '沉淀一线医生在真实临床工作中的可复用经验，帮助同行建立更完整的诊疗思路。',
            focus: '真实经验、临床路径、同行启发',
            output: '15-20分钟专题讲述'
        }
    ];
}

function ensureThemeCard(type, index) {
    const themeList = document.querySelector(`.theme-list[data-type="${type}"]`);
    if (!themeList) return null;

    while (themeList.children.length <= index) {
        const card = createThemeCard(type, themeList.children.length);
        themeList.appendChild(card);
        bindThemeActionEvents(card, type);
        bindThemeInputEvents(card);
    }

    updateThemeActions(type);
    return themeList.children[index];
}

function fillThemeCard(card, data, force = false) {
    if (!card) return;

    [
        ['.theme-name', data.name],
        ['.theme-desc', data.desc],
        ['.theme-focus', data.focus]
    ].forEach(([selector, value]) => {
        const field = card.querySelector(selector);
        if (field && (force || !field.value.trim())) {
            field.value = value;
        }
    });
}

function fillThemeSuggestions() {
    const suggestions = buildThemeSuggestions();
    const typeIndexes = {};

    suggestions.forEach(suggestion => {
        const index = typeIndexes[suggestion.type] || 0;
        const card = ensureThemeCard(suggestion.type, index);
        fillThemeCard(card, suggestion, false);
        typeIndexes[suggestion.type] = index + 1;
    });

    document.querySelectorAll('.type-theme-card').forEach(card => card.classList.remove('active'));
    document.querySelector('.type-theme-card[data-type="medical-podcast"]')?.classList.add('active');
    updateThemeCounts();
}

function createRequirementCard(label, content) {
    const card = document.createElement('div');
    card.className = 'requirement-card';
    card.innerHTML = `
        <div class="requirement-row">
            <input type="text" class="requirement-label-input" placeholder="标签" value="${label}">
            <span class="requirement-colon">：</span>
            <input type="text" class="requirement-content-input" placeholder="详细内容" value="${content}">
        </div>
        <div class="requirement-actions">
            <button class="requirement-btn add-btn">新增</button>
            <button class="requirement-btn delete-btn">删除</button>
        </div>
    `;
    return card;
}

function fillRequirementDefaults() {
    const requirementList = document.getElementById('requirementList');
    if (!requirementList) return;

    const defaults = [
        ['内容完整', '请说明病例背景、诊断依据、治疗过程、关键判断和复盘思考。'],
        ['隐私保护', '请确保患者姓名、身份证号、联系方式、影像编号等隐私信息已脱敏。'],
        ['学术价值', '请突出诊疗思路、决策依据、经验启发或特殊病例特点。'],
        ['表达规范', '请围绕主题展开，避免纯产品宣传或与主题无关的内容。'],
        ['资料清晰', '图片、视频或病例资料需清晰可读，关键节点需要配合文字说明。']
    ];

    requirementList.innerHTML = '';
    defaults.forEach(([label, content]) => {
        requirementList.appendChild(createRequirementCard(label, content));
    });
    updateRequirementActions();
    updateRequirementCount();
}

function initActivityScope() {
}

function initDurationOptions() {
    const checkboxes = document.querySelectorAll('.duration-option input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.closest('.duration-option');
            if (this.checked) {
                label.classList.add('active');
            } else {
                label.classList.remove('active');
            }
        });
    });
}

function initDomainModal() {
    const domainModal = document.getElementById('domainModal');
    const closeDomainModal = document.getElementById('closeDomainModal');
    const cancelDomainBtn = document.getElementById('cancelDomainBtn');
    const confirmDomainBtn = document.getElementById('confirmDomainBtn');
    const newDomainName = document.getElementById('newDomainName');
    const activityDomain = document.getElementById('activityDomain');

    function openModal() {
        domainModal.style.display = 'flex';
        newDomainName.value = '';
        newDomainName.focus();
    }

    function closeModal() {
        domainModal.style.display = 'none';
        newDomainName.value = '';
        activityDomain.value = '';
    }

    function addDomain() {
        const name = newDomainName.value.trim();
        if (!name) {
            alert('请输入领域名称');
            return;
        }

        const option = document.createElement('option');
        option.value = name.toLowerCase().replace(/\s+/g, '-');
        option.textContent = name;
        option.selected = true;
        activityDomain.appendChild(option);

        closeModal();
        alert('领域添加成功！');
    }

    activityDomain.addEventListener('change', function() {
        if (this.value === 'add-domain') {
            openModal();
        }
    });
    closeDomainModal.addEventListener('click', closeModal);
    cancelDomainBtn.addEventListener('click', closeModal);
    confirmDomainBtn.addEventListener('click', addDomain);

    domainModal.addEventListener('click', function(e) {
        if (e.target === domainModal) {
            closeModal();
        }
    });

    newDomainName.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            addDomain();
        }
    });
}

function initFormValidation() {
    document.getElementById('activityName').addEventListener('blur', function() {
        validateActivityName(this.value);
    });
}

function validateActivityName(name) {
    if (!name.trim()) return;

    const existingNames = ['心血管疾病病例征稿活动', '糖尿病诊疗研讨会', '肿瘤治疗新进展'];
    if (existingNames.includes(name.trim())) {
        alert('该活动名称已存在，请更换名称');
    }
}

function validateStep(step) {
    switch (step) {
        case 1:
            return validateStep1();
        case 2:
            return validateStep2();
        case 3:
            return validateStep3();
        case 4:
            return true;
        default:
            return true;
    }
}

function validateStep1() {
    const domain = document.getElementById('activityDomain').value;
    const name = document.getElementById('activityName').value.trim();
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (!domain) {
        alert('请选择医学领域');
        return false;
    }
    if (!name) {
        alert('请输入活动名称');
        return false;
    }
    if (!startDate) {
        alert('请选择开始日期');
        return false;
    }
    if (!endDate) {
        alert('请选择结束日期');
        return false;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start < today) {
        alert('开始日期不能早于今天');
        return false;
    }
    if (end < start) {
        alert('结束日期不能早于开始日期');
        return false;
    }

    return true;
}

function validateStep2() {
    const themeCards = document.querySelectorAll('.theme-card');
    let allValid = true;

    themeCards.forEach(card => {
        const name = card.querySelector('.theme-name').value.trim();
        const desc = card.querySelector('.theme-desc').value.trim();
        if (!name || !desc) {
            allValid = false;
        }
    });

    if (!allValid) {
        alert('请填写所有主题的名称和描述');
        return false;
    }

    if (collectRequirements().length === 0) {
        alert('请至少填写一条内容要求');
        return false;
    }

    return true;
}

function validateStep3() {
    generateAcademicExpression(false);
    const requiredFields = [
        ['expressionMission', '本期征集重点标题'],
        ['expressionProblem', '概览说明'],
        ['expressionDoctorValue', '覆盖方向标签']
    ];

    const missing = requiredFields.find(([id]) => !document.getElementById(id)?.value.trim());
    if (missing) {
        alert(`请确认${missing[1]}内容`);
        return false;
    }

    return true;
}

function initSaveDraft() {
    document.getElementById('saveDraftBtn').addEventListener('click', function() {
        saveDraft();
    });
}

function saveDraft() {
    const data = collectFormData();
    localStorage.setItem('activityDraft', JSON.stringify(data));
    alert('已保存为草稿');
}

function initSubmit() {
    document.getElementById('submitBtn').addEventListener('click', function() {
        if (validateStep(1) && validateStep(2) && validateStep(3)) {
            saveDraft();
            alert('活动已保存成功！');
            window.location.href = 'activity-list.html';
        }
    });
}

function collectFormData() {
    const themes = collectThemes();
    const requirements = collectRequirements();
    const domainSelect = document.getElementById('activityDomain');
    const domain = domainSelect?.value || '';
    const domainText = domainSelect && domainSelect.selectedIndex >= 0 ? domainSelect.options[domainSelect.selectedIndex].text : '';
    const expression = {
        mode: document.getElementById('expressionMode')?.value || 'academic',
        mission: document.getElementById('expressionMission')?.value.trim() || '',
        problem: document.getElementById('expressionProblem')?.value.trim() || '',
        doctorValue: document.getElementById('expressionDoctorValue')?.value.trim() || '',
        outcome: '',
        invitation: ''
    };

    return {
        domain,
        domainText,
        name: document.getElementById('activityName').value.trim(),
        cover: document.getElementById('coverImg')?.getAttribute('src') || '',
        background: document.getElementById('activityBackground')?.value.trim() || '',
        purpose: document.getElementById('activityPurpose')?.value.trim() || '',
        desc: '',
        startDate: document.getElementById('startDate').value,
        endDate: document.getElementById('endDate').value,
        themes,
        requirements,
        expression,
        design: collectDesignConfig(),
        status: 'draft'
    };
}

function collectDesignConfig() {
    const activeStyle = document.querySelector('.design-style-option.active')?.dataset.style || 'academic';
    const accent = document.querySelector('input[name="designAccent"]:checked')?.value || '#667eea';

    return {
        style: activeStyle,
        accent,
        detailLayout: document.getElementById('detailLayoutMode')?.value || 'value-first',
        posterLayout: document.getElementById('posterLayoutMode')?.value || 'statement',
        posterTone: document.getElementById('posterToneMode')?.value || 'academic',
        modules: getCheckedValues('.design-module-toggle')
    };
}

function applyModuleVisibility(scopeSelector, modules) {
    const scope = document.querySelector(scopeSelector);
    if (!scope) return;

    scope.querySelectorAll('[data-module]').forEach(el => {
        const module = el.dataset.module;
        if (!module) return;
        el.classList.toggle('module-hidden', modules.length > 0 && !modules.includes(module));
    });
}

function updateReviewContent() {
    const data = collectFormData();
    if (!document.getElementById('reviewBasic')) return;

    document.getElementById('reviewBasic').innerHTML = `
        <div class="review-row"><span class="review-label">活动名称：</span><span class="review-value">${data.name || '未填写'}</span></div>
        <div class="review-row"><span class="review-label">医学领域：</span><span class="review-value">${data.domainText || '未填写'}</span></div>
        <div class="review-row"><span class="review-label">活动背景：</span><span class="review-value">${data.background || '未填写'}</span></div>
        <div class="review-row"><span class="review-label">活动目的：</span><span class="review-value">${data.purpose || '未填写'}</span></div>
        <div class="review-row"><span class="review-label">招募时间：</span><span class="review-value">${data.startDate ? data.startDate + ' 至 ' + data.endDate : '未填写'}</span></div>
    `;

    let themesHtml = '<div style="margin-bottom: 12px;"><strong>征稿主题：</strong></div>';
    data.themes.forEach((theme, index) => {
        themesHtml += `
            <div style="margin-left: 16px; margin-bottom: 8px;">
                <div><strong>${index + 1}. ${theme.name}</strong> <span style="color:#6b7280;">${theme.typeName}</span></div>
                <div style="color: #6b7280;">${theme.desc}</div>
            </div>
        `;
    });
    themesHtml += `
        <div class="review-row" style="margin-top: 12px;"><span class="review-label">内容要求：</span><span class="review-value">${data.requirements.join('<br>') || '未填写'}</span></div>
    `;
    document.getElementById('reviewThemes').innerHTML = themesHtml;

    if (document.getElementById('reviewEnterprise')) {
        document.getElementById('reviewEnterprise').innerHTML = `
            <div class="review-row"><span class="review-label">征集重点：</span><span class="review-value">${data.expression.mission || '未填写'}</span></div>
            <div class="review-row"><span class="review-label">覆盖方向：</span><span class="review-value">${data.expression.doctorValue || '未填写'}</span></div>
        `;
    }
}

function initCoverUpload() {
    const uploadArea = document.getElementById('coverUpload');
    const placeholder = uploadArea.querySelector('.upload-placeholder');
    const preview = document.getElementById('coverPreview');
    const coverImg = document.getElementById('coverImg');
    const removeBtn = document.querySelector('.remove-cover-btn');

    uploadArea.addEventListener('click', function(e) {
        if (e.target !== removeBtn && !preview.contains(e.target)) {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/jpeg,image/png';
            input.onchange = function(e) {
                const file = e.target.files[0];
                if (file) {
                    if (file.size > 2 * 1024 * 1024) {
                        alert('图片大小不能超过2MB');
                        return;
                    }
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        coverImg.src = event.target.result;
                        placeholder.style.display = 'none';
                        preview.style.display = 'block';
                    };
                    reader.readAsDataURL(file);
                }
            };
            input.click();
        }
    });

    removeBtn.addEventListener('click', function() {
        coverImg.src = '';
        preview.style.display = 'none';
        placeholder.style.display = 'block';
    });
}

function initDateValidation() {
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');

    const today = new Date().toISOString().split('T')[0];
    startDate.min = today;

    startDate.addEventListener('change', function() {
        endDate.min = this.value;
        if (endDate.value && endDate.value < this.value) {
            endDate.value = '';
        }
    });
}

function initPurchaseLimitValidation() {
    const minPurchase = document.getElementById('minPurchase');
    const maxPurchase = document.getElementById('maxPurchase');
    if (!minPurchase || !maxPurchase) return;

    minPurchase.addEventListener('change', function() {
        maxPurchase.min = this.value;
        if (maxPurchase.value && parseInt(maxPurchase.value) < parseInt(this.value)) {
            maxPurchase.value = this.value;
        }
    });

    maxPurchase.addEventListener('change', function() {
        if (this.value && parseInt(this.value) < parseInt(minPurchase.value)) {
            alert('最大采购数不能小于最小采购数');
            this.value = minPurchase.value;
        }
    });
}

function initWordLimitValidation() {
    const minWords = document.getElementById('minWords');
    const maxWords = document.getElementById('maxWords');

    if (!minWords || !maxWords) return;

    minWords.addEventListener('change', function() {
        if (maxWords.value && parseInt(maxWords.value) < parseInt(this.value || 0)) {
            maxWords.value = '';
        }
    });

    maxWords.addEventListener('change', function() {
        if (this.value && parseInt(this.value) < parseInt(minWords.value || 0)) {
            alert('最多字数不能小于最少字数');
            this.value = '';
        }
    });
}

function goBack() {
    window.location.href = 'activity-list.html';
}

function updateAIPreview() {
    const data = collectFormData();
    const defaultCover = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&h=520&fit=crop';
    const cover = data.cover || defaultCover;
    const mission = data.expression.mission || '围绕心血管真实世界诊疗经验，征集可复盘、可交流的内容。';
    const problem = data.expression.problem || '第 3 步确认的概览说明会在这里展示。';
    const doctorValue = data.expression.doctorValue || '第 3 步确认的覆盖方向会在这里展示。';
    const outcome = data.expression.doctorValue || '覆盖方向会在这里展示。';
    const design = data.design || collectDesignConfig();

    setText('previewName', data.name || '心血管疾病病例征稿活动');
    setText('previewMission', mission);
    setText('previewProblem', problem);
    setText('previewDoctorValue', doctorValue);

    const themesContainer = document.getElementById('previewThemes');
    renderThemeTags(themesContainer, data.themes);

    const coverPreview = document.getElementById('previewCover');
    if (coverPreview) {
        coverPreview.innerHTML = `<img src="${cover}" alt="活动封面">`;
    }

    document.querySelectorAll('.poster-builder, #posterPreview').forEach(el => {
        el.style.setProperty('--design-accent', design.accent);
    });

    const posterPreview = document.getElementById('posterPreview');
    if (posterPreview) {
        posterPreview.classList.remove('style-academic', 'style-clinical', 'style-challenge');
        posterPreview.classList.add(`style-${design.style}`);
    }

}

function buildPosterMission(data, mission, doctorValue, problem) {
    const layout = data.design?.posterLayout || 'statement';
    const tone = data.design?.posterTone || 'academic';

    if (layout === 'theme') {
        const firstTheme = data.themes.find(theme => theme.name)?.name;
        return firstTheme ? `围绕「${firstTheme}」汇集真实临床经验。` : mission;
    }

    if (layout === 'invitation') {
        return tone === 'warm'
            ? '诚邀你分享真实诊疗经验，让有价值的判断被更多同行看见。'
            : doctorValue;
    }

    if (tone === 'sharp') {
        return problem;
    }

    return mission;
}

function setText(id, value) {
    const el = document.getElementById(id);
    if (el) {
        el.textContent = value;
    }
}

function renderThemeTags(container, themes) {
    if (!container) return;
    container.innerHTML = '';
    const usableThemes = themes.filter(theme => theme.name || theme.desc);
    (usableThemes.length ? usableThemes : [{ name: '冠心病诊疗新进展', typeName: '医学播客' }]).forEach((theme, index) => {
        const themeTag = document.createElement('div');
        themeTag.className = 'theme-tag';
        themeTag.textContent = `${index + 1}. ${theme.name || '未命名主题'}（${theme.typeName}）`;
        container.appendChild(themeTag);
    });
}

function initDesignControls() {
    document.querySelectorAll('.design-style-option').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.design-style-option').forEach(item => item.classList.remove('active'));
            this.classList.add('active');
            updateAIPreview();
        });
    });

    document.querySelectorAll('input[name="designAccent"], .design-module-toggle').forEach(input => {
        input.addEventListener('change', updateAIPreview);
    });

    ['detailLayoutMode', 'posterLayoutMode', 'posterToneMode'].forEach(id => {
        const field = document.getElementById(id);
        if (field) {
            field.addEventListener('change', updateAIPreview);
        }
    });

}

document.addEventListener('DOMContentLoaded', function() {
    initAIChat();
    initPreviewCover();
});

function initPreviewCover() {
    const mockCover = 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&h=520&fit=crop';

    const coverPreview = document.getElementById('previewCover');
    if (coverPreview) {
        coverPreview.innerHTML = `<img src="${mockCover}" alt="活动封面">`;
    }

    const themesContainer = document.getElementById('previewThemes');
    if (themesContainer) {
        const themes = [
            '冠心病诊疗新进展',
            '心力衰竭管理', 
            '心律失常诊治'
        ];
        themesContainer.innerHTML = '';
        themes.forEach((theme, index) => {
            const themeTag = document.createElement('div');
            themeTag.className = 'theme-tag';
            themeTag.textContent = `${index + 1}. ${theme}`;
            themesContainer.appendChild(themeTag);
        });
    }
}

function initAIChat() {
    const sendBtn = document.getElementById('sendBtn');
    const regenerateBtn = document.getElementById('regenerateBtn');
    const finishBtn = document.getElementById('finishCreateBtn');
    const chatInput = document.getElementById('chatInput');
    const chatContainer = document.getElementById('chatContainer');

    if (sendBtn && chatInput) sendBtn.addEventListener('click', function() {
        const message = chatInput.value.trim();
        if (!message) return;

        addUserMessage(message);
        chatInput.value = '';

        setTimeout(() => {
            addAIMessage(message);
        }, 500);
    });

    if (chatInput && sendBtn) chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendBtn.click();
        }
    });

    if (regenerateBtn) regenerateBtn.addEventListener('click', function() {
        updateAIPreview();
        if (!chatContainer) return;
        chatContainer.innerHTML = `
            <div class="chat-message ai-message">
                <div class="chat-avatar ai">AI</div>
                <div class="chat-content">
                    <p>已基于当前活动信息重新生成活动海报。你可以继续要求我调整：</p>
                    <ul>
                        <li>让征集重点更突出</li>
                        <li>让海报更偏学术倡议</li>
                        <li>减少广告感，强化平台正式感</li>
                    </ul>
                </div>
            </div>
        `;
    });

    if (finishBtn) finishBtn.addEventListener('click', function() {
        publishActivity('活动已保存成功，医生端概览和活动海报已同步生成。');
    });
}

function publishActivity(message) {
    if (validateStep(1) && validateStep(2) && validateStep(3)) {
        saveDraft();
        alert(message);
        window.location.href = 'activity-list.html';
    }
}

function addUserMessage(message) {
    const chatContainer = document.getElementById('chatContainer');
    if (!chatContainer) return;
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message user-message';
    messageDiv.innerHTML = `
        <div class="chat-avatar user">U</div>
        <div class="chat-content">${message}</div>
    `;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function addAIMessage(userMessage) {
    const chatContainer = document.getElementById('chatContainer');
    if (!chatContainer) return;
    applyDesignInstruction(userMessage);
    updateAIPreview();
    const aiResponses = [
        '已调整海报：突出本期征集重点和平台官方学术征集属性。',
        '已生成偏病例挑战的版本：突出真实病例与诊疗复盘。',
        '已优化海报阅读层级：先看活动名称，再看征集重点和主题方向。',
        '已同步更新移动端海报：弱化运营数据，强化学术参与感。',
        '已生成专题征集风格：突出主题方向和医生可参与入口。'
    ];
    
    const randomIndex = Math.floor(Math.random() * aiResponses.length);
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chat-message ai-message';
    messageDiv.innerHTML = `
        <div class="chat-avatar ai">AI</div>
        <div class="chat-content">${aiResponses[randomIndex]}</div>
    `;
    chatContainer.appendChild(messageDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function applyDesignInstruction(message) {
    const text = message || '';

    if (text.includes('挑战') || text.includes('病例')) {
        activateDesignStyle('challenge');
    } else if (text.includes('共创') || text.includes('临床')) {
        activateDesignStyle('clinical');
    } else if (text.includes('严谨') || text.includes('学术') || text.includes('正式')) {
        activateDesignStyle('academic');
    }

    const posterLayout = document.getElementById('posterLayoutMode');
    if (posterLayout) {
        if (text.includes('主题')) {
            posterLayout.value = 'theme';
        } else if (text.includes('邀请')) {
            posterLayout.value = 'invitation';
        }
    }

    const posterTone = document.getElementById('posterToneMode');
    if (posterTone) {
        if (text.includes('真诚') || text.includes('温和')) {
            posterTone.value = 'warm';
        } else if (text.includes('问题') || text.includes('锐利')) {
            posterTone.value = 'sharp';
        }
    }
}

function activateDesignStyle(style) {
    const target = document.querySelector(`.design-style-option[data-style="${style}"]`);
    if (!target) return;
    document.querySelectorAll('.design-style-option').forEach(btn => btn.classList.remove('active'));
    target.classList.add('active');
}
