// 首页交互功能模块

// 初始化首页功能
function initHomePage() {
    // 初始化统计卡片动画
    initStatCardAnimations();
    
    // 初始化快捷入口交互
    initQuickEntries();
    
    // 初始化待办任务交互
    initTaskItems();
    
    // 初始化审核队列交互
    initReviewQueue();
    
    // 初始化风控预警交互
    initRiskAlerts();
    
    // 初始化页面加载动画
    initPageLoadAnimation();
}

// 初始化统计卡片动画
function initStatCardAnimations() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach((card, index) => {
        // 添加加载动画
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
        
        // 添加悬停效果
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = 'var(--shadow-md)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'var(--shadow-sm)';
        });
    });
}

// 初始化快捷入口交互
function initQuickEntries() {
    const quickEntries = document.querySelectorAll('.quick-entry');
    
    quickEntries.forEach(entry => {
        entry.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 添加点击动画
            entry.style.transform = 'scale(0.95)';
            setTimeout(() => {
                entry.style.transform = 'scale(1)';
            }, 150);
            
            // 显示通知
            const entryText = entry.querySelector('span').textContent;
            showNotification(`正在跳转到${entryText}...`, 'info');
            
            // 模拟跳转延迟
            setTimeout(() => {
                // 根据入口类型跳转到不同页面
                if (entryText.includes('新建工单')) {
                    // 跳转到工单页面
                    console.log('跳转到新建工单页面');
                } else if (entryText.includes('新建合同')) {
                    // 跳转到新建合同页面
                    console.log('跳转到新建合同页面');
                } else if (entryText.includes('新建发票')) {
                    // 跳转到新建发票页面
                    console.log('跳转到新建发票页面');
                } else if (entryText.includes('医生审核')) {
                    // 跳转到医生审核页面
                    console.log('跳转到医生审核页面');
                } else if (entryText.includes('学术委托审核')) {
                    // 跳转到学术委托审核页面
                    console.log('跳转到学术委托审核页面');
                } else if (entryText.includes('医学播客审核')) {
                    // 跳转到医学播客审核页面
                    console.log('跳转到医学播客审核页面');
                } else if (entryText.includes('在线病例互动审核')) {
                    // 跳转到在线病例互动审核页面
                    console.log('跳转到在线病例互动审核页面');
                } else if (entryText.includes('合规复审')) {
                    // 跳转到合规复审页面
                    console.log('跳转到合规复审页面');
                }
            }, 500);
        });
    });
}

// 初始化待办任务交互
function initTaskItems() {
    const taskItems = document.querySelectorAll('.task-item');
    const actionButtons = document.querySelectorAll('.task-item .action-btn');
    
    taskItems.forEach((task, index) => {
        // 添加加载动画
        setTimeout(() => {
            task.style.opacity = '0';
            task.style.transform = 'translateX(-20px)';
            task.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                task.style.opacity = '1';
                task.style.transform = 'translateX(0)';
            }, 50);
        }, index * 100);
    });
    
    actionButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 添加点击动画
            button.style.transform = 'scale(0.9)';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
            }, 150);
            
            // 显示通知
            const taskTitle = button.closest('.task-item').querySelector('.task-title').textContent;
            showNotification(`正在处理${taskTitle}...`, 'info');
            
            // 模拟处理延迟
            setTimeout(() => {
                showNotification(`${taskTitle}处理完成`, 'success');
                
                // 模拟任务状态更新
                const taskItem = button.closest('.task-item');
                taskItem.style.opacity = '0.5';
                taskItem.querySelector('.task-title').textContent += ' (处理中)';
                
                setTimeout(() => {
                    taskItem.style.opacity = '1';
                    taskItem.querySelector('.task-title').textContent = taskTitle;
                }, 1000);
            }, 800);
        });
    });
}

// 初始化审核队列交互
function initReviewQueue() {
    const queueItems = document.querySelectorAll('.queue-item');
    const viewAllLinks = document.querySelectorAll('.white-content-container a[href="#"]');
    
    queueItems.forEach((item, index) => {
        // 添加加载动画
        setTimeout(() => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(20px)';
            item.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, 50);
        }, index * 100);
        
        // 添加点击效果
        item.addEventListener('click', () => {
            item.style.transform = 'scale(0.98)';
            setTimeout(() => {
                item.style.transform = 'scale(1)';
            }, 150);
            
            // 显示通知
            const queueTitle = item.querySelector('h3').textContent;
            showNotification(`正在跳转到${queueTitle}页面...`, 'info');
        });
    });
    
    viewAllLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 显示通知
            const sectionTitle = link.closest('.white-content-container').querySelector('h2').textContent;
            showNotification(`查看${sectionTitle}全部内容`, 'info');
        });
    });
}

// 初始化风控预警交互
function initRiskAlerts() {
    const alertItems = document.querySelectorAll('.alert-item');
    
    alertItems.forEach((alert, index) => {
        // 添加加载动画
        setTimeout(() => {
            alert.style.opacity = '0';
            alert.style.transform = 'translateY(10px)';
            alert.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                alert.style.opacity = '1';
                alert.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
        
        // 添加点击效果
        alert.addEventListener('click', () => {
            alert.style.transform = 'scale(0.98)';
            setTimeout(() => {
                alert.style.transform = 'scale(1)';
            }, 150);
            
            // 显示通知
            const alertTitle = alert.querySelector('h3').textContent;
            showNotification(`正在处理${alertTitle}预警...`, 'warning');
        });
    });
}

// 初始化页面加载动画
function initPageLoadAnimation() {
    const contentArea = document.querySelector('.content-area');
    
    // 添加页面加载动画
    contentArea.style.opacity = '0';
    contentArea.style.transform = 'translateY(20px)';
    contentArea.style.transition = 'all 0.8s ease';
    
    setTimeout(() => {
        contentArea.style.opacity = '1';
        contentArea.style.transform = 'translateY(0)';
    }, 200);
}

// 导出函数，以便其他脚本使用
window.initHomePage = initHomePage;
window.initStatCardAnimations = initStatCardAnimations;
window.initQuickEntries = initQuickEntries;
window.initTaskItems = initTaskItems;
window.initReviewQueue = initReviewQueue;
window.initRiskAlerts = initRiskAlerts;
window.initPageLoadAnimation = initPageLoadAnimation;