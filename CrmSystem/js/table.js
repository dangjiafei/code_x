// 表格交互模块
// 负责处理表格相关的交互逻辑

// 更新所有查看详情按钮的链接
function updateViewDetailLinks() {
    // 只更新活动管理页面的详情链接，避免影响其他页面
    const pathname = window.location.pathname;
    
    // 只有在活动管理相关页面才执行链接更新
    if (pathname.includes('activity') || pathname.includes('medical-podcast')) {
        const viewLinks = document.querySelectorAll('.record-table .action-btn.view');
        viewLinks.forEach((link, index) => {
            // 检查是否有activity-id属性
            const row = link.closest('tr');
            const activityId = row.querySelector('.activity-id');
            if (activityId) {
                // 获取活动ID，从表格行中提取或使用索引
                const id = activityId.textContent.replace('ID: ', '') || `activity-${index + 1}`;
                link.setAttribute('href', `activity-detail.html?id=${id}`);
            }
        });
    }
}

// 表格交互逻辑
function initTableInteraction() {
    // 表格行悬停效果
    const tableRows = document.querySelectorAll('.record-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            row.style.backgroundColor = '#f8fafc';
        });
        
        row.addEventListener('mouseleave', () => {
            row.style.backgroundColor = '';
        });
    });
    
    // 表格排序
    const tableHeaders = document.querySelectorAll('.record-table th');
    tableHeaders.forEach((header, index) => {
        header.addEventListener('click', () => {
            sortTable(index);
        });
    });
}

// 表格排序功能
function sortTable(columnIndex) {
    const table = document.querySelector('.record-table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    // 检查当前排序状态
    const isAscending = !header.classList.contains('sorted-asc');
    
    // 移除所有表头的排序状态
    document.querySelectorAll('.record-table th').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
    });
    
    // 设置当前表头的排序状态
    const header = tableHeaders[columnIndex];
    header.classList.add(isAscending ? 'sorted-asc' : 'sorted-desc');
    
    // 排序行
    rows.sort((a, b) => {
        const aText = a.cells[columnIndex].textContent.trim();
        const bText = b.cells[columnIndex].textContent.trim();
        
        // 数字比较
        if (!isNaN(aText) && !isNaN(bText)) {
            return isAscending ? parseFloat(aText) - parseFloat(bText) : parseFloat(bText) - parseFloat(aText);
        }
        
        // 日期比较
        const dateA = new Date(aText);
        const dateB = new Date(bText);
        if (!isNaN(dateA) && !isNaN(dateB)) {
            return isAscending ? dateA - dateB : dateB - dateA;
        }
        
        // 字符串比较
        return isAscending ? aText.localeCompare(bText) : bText.localeCompare(aText);
    });
    
    // 重新插入行
    rows.forEach(row => {
        tbody.appendChild(row);
    });
}

// 导出函数，以便其他脚本使用
window.updateViewDetailLinks = updateViewDetailLinks;
window.initTableInteraction = initTableInteraction;
window.sortTable = sortTable;
