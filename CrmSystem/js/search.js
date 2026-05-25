// 搜索和筛选模块
// 负责处理页面搜索和筛选功能

// 搜索功能逻辑
function initSearchFunctionality() {
    // 搜索按钮点击事件
    const searchButtons = document.querySelectorAll('.search-btn');
    searchButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            performSearch();
        });
    });
    
    // 搜索框回车事件
    const searchInputs = document.querySelectorAll('.search-box input');
    searchInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    });
    
    // 重置按钮点击事件
    const resetButtons = document.querySelectorAll('.reset-btn');
    resetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            resetSearch();
        });
    });
}

// 初始化快速筛选功能
function initQuickFilters() {
    // 获取所有快速筛选按钮
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // 为每个按钮添加点击事件监听器
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const clickedBtn = this;
            
            // 移除所有按钮的active类
            filterButtons.forEach(button => {
                button.classList.remove('active');
            });
            
            // 使用requestAnimationFrame确保浏览器正确渲染阴影
            requestAnimationFrame(function() {
                // 为当前点击的按钮添加active类
                clickedBtn.classList.add('active');
                
                // 执行筛选操作
                const status = clickedBtn.dataset.status;
                filterActivitiesByStatus(status);
            });
        });
    });
}

// 根据状态筛选活动
function filterActivitiesByStatus(status) {
    const rows = document.querySelectorAll('.record-table tbody tr');
    
    rows.forEach(row => {
        const statusTag = row.querySelector('.status-tag');
        if (!statusTag) return;
        
        const rowStatus = statusTag.className.replace('status-tag ', '').trim();
        
        if (status === 'all') {
            // 显示所有行
            row.style.display = '';
        } else {
            // 只显示匹配状态的行
            row.style.display = (rowStatus === status) ? '' : 'none';
        }
    });
}

// 页面加载时默认筛选全部活动
function defaultFilterPending() {
    // 查找全部活动筛选按钮并点击
    const allFilterBtn = document.querySelector('.filter-btn[data-status="all"]');
    if (allFilterBtn) {
        allFilterBtn.click();
    }
}

// 执行搜索
function performSearch() {
    // 获取搜索条件
    const searchInput = document.querySelector('.search-box input');
    const searchText = searchInput ? searchInput.value.trim() : '';
    
    const statusSelect = document.querySelector('.filter-item select');
    const statusFilter = statusSelect ? statusSelect.value : 'all';
    
    const startDate = document.querySelector('.date-range input[type="date"]:first-child');
    const endDate = document.querySelector('.date-range input[type="date"]:last-child');
    const startDateValue = startDate ? startDate.value : '';
    const endDateValue = endDate ? endDate.value : '';
    
    // 这里可以添加搜索逻辑
    console.log('Performing search with:', {
        searchText,
        statusFilter,
        startDateValue,
        endDateValue
    });
    
    // 示例：根据搜索文本过滤表格行
    const tableRows = document.querySelectorAll('.record-table tbody tr');
    tableRows.forEach(row => {
        const activityName = row.querySelector('.material-title');
        if (activityName) {
            const nameText = activityName.textContent.toLowerCase();
            const matchesSearch = searchText === '' || nameText.includes(searchText.toLowerCase());
            
            // 这里可以添加更多过滤条件
            
            row.style.display = matchesSearch ? '' : 'none';
        }
    });
}

// 重置搜索
function resetSearch() {
    // 重置搜索框
    const searchInputs = document.querySelectorAll('.search-box input');
    searchInputs.forEach(input => {
        input.value = '';
    });
    
    // 重置筛选条件
    const selectElements = document.querySelectorAll('.filter-item select');
    selectElements.forEach(select => {
        select.value = 'all';
    });
    
    // 重置日期范围
    const dateInputs = document.querySelectorAll('.date-range input[type="date"]');
    dateInputs.forEach(input => {
        input.value = '';
    });
    
    // 显示所有记录
    const tableRows = document.querySelectorAll('.record-table tbody tr');
    tableRows.forEach(row => {
        row.style.display = '';
    });
}

// 根据状态过滤记录
function filterRecordsByStatus(status) {
    // 这里可以添加过滤记录的逻辑
    console.log('Filtering records by status:', status);
    
    // 示例：根据状态过滤表格行
    const tableRows = document.querySelectorAll('.record-table tbody tr');
    tableRows.forEach(row => {
        if (status === 'all') {
            row.style.display = '';
        } else {
            const statusElement = row.querySelector('.status');
            if (statusElement) {
                const rowStatus = statusElement.dataset.status;
                row.style.display = (rowStatus === status) ? '' : 'none';
            }
        }
    });
}

// 导出函数，以便其他脚本使用
window.initSearchFunctionality = initSearchFunctionality;
window.initQuickFilters = initQuickFilters;
window.filterActivitiesByStatus = filterActivitiesByStatus;
window.defaultFilterPending = defaultFilterPending;
window.performSearch = performSearch;
window.resetSearch = resetSearch;
window.filterRecordsByStatus = filterRecordsByStatus;
