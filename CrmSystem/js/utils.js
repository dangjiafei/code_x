// 工具函数模块
// 提供通用的工具函数

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

// 格式化时间
function formatTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

// 格式化日期时间
function formatDateTime(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// 获取URL参数
function getUrlParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// 设置URL参数
function setUrlParam(name, value) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set(name, value);
    window.history.pushState({}, '', `${window.location.pathname}?${urlParams}`);
}

// 删除URL参数
function deleteUrlParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete(name);
    window.history.pushState({}, '', `${window.location.pathname}?${urlParams}`);
}

// 显示通知
function showNotification(message, type = 'info', duration = 3000) {
    // 这里可以添加显示通知的逻辑
    console.log(`[${type.toUpperCase()}] ${message}`);
    
    // 示例：创建一个简单的通知
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 12px 20px;
        background-color: ${type === 'success' ? '#4ade80' : type === 'error' ? '#ef4444' : type === 'warning' ? '#fbbf24' : '#667eea'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        font-size: 0.9rem;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // 自动移除通知
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, duration);
}

// 添加动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// 导出函数，以便其他脚本使用
window.formatDate = formatDate;
window.formatTime = formatTime;
window.formatDateTime = formatDateTime;
window.getUrlParam = getUrlParam;
window.setUrlParam = setUrlParam;
window.deleteUrlParam = deleteUrlParam;
window.showNotification = showNotification;
