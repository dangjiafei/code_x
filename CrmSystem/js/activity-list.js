// 活动列表页面交互逻辑

document.addEventListener('DOMContentLoaded', function() {
    // 视图切换
    initViewToggle();
    
    // 筛选功能
    initFilter();
    
    // 全选功能
    initSelectAll();
    
    // 新建活动按钮
    initCreateActivity();
    
    // 卡片和详情按钮点击事件
    initCardClicks();
    initDetailButtons();
});

// 视图切换
function initViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的激活状态
            viewButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的激活状态
            this.classList.add('active');
            
            // 获取要切换到的视图类型
            const viewType = this.getAttribute('data-view');
            
            // 隐藏所有视图
            const cardView = document.getElementById('cardView');
            const tableView = document.getElementById('tableView');
            
            if (viewType === 'card') {
                cardView.classList.add('active');
                tableView.classList.remove('active');
            } else if (viewType === 'table') {
                tableView.classList.add('active');
                cardView.classList.remove('active');
            }
        });
    });
}

// 筛选功能
function initFilter() {
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const statusSelect = document.getElementById('statusSelect');
    const domainButtons = document.querySelectorAll('.domain-filter-btn');
    
    // 搜索输入框
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            applyFilter();
        });
    }
    
    // 排序选择
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            applyFilter();
        });
    }
    
    // 状态选择
    if (statusSelect) {
        statusSelect.addEventListener('change', function() {
            applyFilter();
        });
    }

    // 领域选择
    domainButtons.forEach(button => {
        button.addEventListener('click', function() {
            domainButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            applyFilter();
        });
    });
}

// 应用筛选
function applyFilter() {
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');
    const statusSelect = document.getElementById('statusSelect');
    const activeDomain = document.querySelector('.domain-filter-btn.active');
    
    const searchText = searchInput ? searchInput.value.trim() : '';
    const sortBy = sortSelect ? sortSelect.value : '';
    const status = statusSelect ? statusSelect.value : '';
    const domain = activeDomain ? activeDomain.getAttribute('data-domain') : 'all';
    
    console.log('筛选条件:', {
        searchText,
        sortBy,
        status,
        domain
    });
    
    // 这里可以添加实际的筛选逻辑
}

// 全选功能
function initSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAll');
    
    if (selectAllCheckbox) {
        selectAllCheckbox.addEventListener('change', function() {
            const checkboxes = document.querySelectorAll('.activity-table tbody input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.checked = this.checked;
            });
        });
    }
}

// 新建活动按钮
function initCreateActivity() {
    const createBtn = document.getElementById('createActivityBtn');
    
    if (createBtn) {
        createBtn.addEventListener('click', function() {
            window.location.href = 'activity-create.html';
        });
    }
}

// 卡片点击事件
function initCardClicks() {
    const cards = document.querySelectorAll('.activity-card');
    
    cards.forEach(card => {
        card.addEventListener('click', function(e) {
            const id = this.getAttribute('data-id');
            if (id) {
                window.location.href = `activity-detail.html?id=${id}`;
            }
        });
        
        card.style.cursor = 'pointer';
    });
}

// 详情按钮点击事件
function initDetailButtons() {
    const detailBtns = document.querySelectorAll('.action-btn.view');
    
    if (detailBtns) {
        detailBtns.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const id = this.getAttribute('data-id');
                if (id) {
                    window.location.href = `activity-detail.html?id=${id}`;
                }
            });
        });
    }
}
