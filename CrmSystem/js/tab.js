// 标签切换模块
// 负责处理页面标签切换逻辑

// 标签切换逻辑
function initTabSwitching() {
    // 服务类型标签切换
    const serviceTabs = document.querySelectorAll('.service-tab');
    if (serviceTabs.length > 0) {
        serviceTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // 移除所有激活状态
                serviceTabs.forEach(t => t.classList.remove('active'));
                // 添加当前激活状态
                tab.classList.add('active');
                
                // 这里可以添加切换内容的逻辑
                const tabType = tab.dataset.tab;
                if (tabType) {
                    switchContentByTab(tabType);
                }
            });
        });
    }
    
    // 记录状态标签切换
    const recordTabs = document.querySelectorAll('.record-tab');
    if (recordTabs.length > 0) {
        recordTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // 移除所有激活状态
                recordTabs.forEach(t => t.classList.remove('active'));
                // 添加当前激活状态
                tab.classList.add('active');
                
                // 这里可以添加过滤记录的逻辑
                const status = tab.dataset.status;
                if (status) {
                    filterRecordsByStatus(status);
                }
            });
        });
    }
    
    // 医学播客内容标签切换
    const contentTabs = document.querySelectorAll('.content-tabs .tab-item');
    if (contentTabs.length > 0) {
        contentTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // 移除所有激活状态
                contentTabs.forEach(t => t.classList.remove('active'));
                // 添加当前激活状态
                tab.classList.add('active');
                
                // 切换内容区域
                const tabType = tab.dataset.tab;
                if (tabType) {
                    switchContentByTab(tabType);
                }
            });
        });
    }
}

// 根据标签切换内容
function switchContentByTab(tabType) {
    // 隐藏所有内容区域
    const allContent = document.querySelectorAll('.tab-content');
    allContent.forEach(content => {
        content.classList.remove('active');
        content.style.display = 'none';
    });
    
    // 显示对应内容区域
    const targetContent = document.getElementById(`content-${tabType}`);
    if (targetContent) {
        targetContent.classList.add('active');
        targetContent.style.display = 'block';
        
        // 为当前标签页的快速筛选按钮添加默认选中状态
        requestAnimationFrame(function() {
            const allFilterButtons = document.querySelectorAll('.filter-btn');
            allFilterButtons.forEach(btn => btn.classList.remove('active'));
            
            // 找到当前标签页对应的"全部"筛选按钮
            const allFilterBtn = targetContent.querySelector('.filter-btn[data-status="all"]');
            if (allFilterBtn) {
                allFilterBtn.classList.add('active');
                // 执行筛选操作
                const status = allFilterBtn.dataset.status;
                filterActivitiesByStatus(status);
            }
        });
    }
    
    // 切换筛选栏
    const allFilterBars = document.querySelectorAll('.filter-bar');
    allFilterBars.forEach(bar => {
        bar.classList.remove('active');
        bar.style.display = 'none';
    });
    
    const targetFilterBar = document.querySelector(`.${tabType}-filter`);
    if (targetFilterBar) {
        targetFilterBar.classList.add('active');
        targetFilterBar.style.display = 'flex';
    }
    
    // 切换记录标签
    const allRecordTabs = document.querySelectorAll('.record-tabs');
    allRecordTabs.forEach(tabs => {
        tabs.style.display = 'none';
    });
    
    const targetRecordTabs = document.querySelector(`.${tabType}-tabs`);
    if (targetRecordTabs) {
        targetRecordTabs.style.display = 'flex';
    }
}

// 导出函数，以便其他脚本使用
window.initTabSwitching = initTabSwitching;
window.switchContentByTab = switchContentByTab;
