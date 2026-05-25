// 操作按钮模块
// 负责处理页面操作按钮的交互逻辑

// 操作按钮事件
function initActionButtons() {
    // 查看详情按钮
    const viewButtons = document.querySelectorAll('.action-btn.view');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // 获取活动ID，从表格行中提取
            const row = btn.closest('tr');
            const activityId = row.querySelector('.activity-id')?.textContent.replace('ID: ', '') || '';
            console.log('Viewing activity details for:', activityId);
            // 跳转到详情页
            // window.location.href = `activity-detail.html?id=${activityId}`;
        });
    });
    
    // 管理按钮
    const manageButtons = document.querySelectorAll('.action-btn.manage');
    manageButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const activityId = btn.dataset.id;
            console.log('Managing activity:', activityId);
            // 这里可以添加管理操作的逻辑
        });
    });
    
    // 其他按钮类型
    const deleteButtons = document.querySelectorAll('.action-btn.delete');
    deleteButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const activityId = btn.dataset.id;
            if (confirm('确定要删除这个活动吗？')) {
                console.log('Deleting activity:', activityId);
                // 这里可以添加删除操作的逻辑
            }
        });
    });
}

// 导出函数，以便其他脚本使用
window.initActionButtons = initActionButtons;
