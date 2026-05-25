// 主入口文件
// 加载并初始化所有模块化的JS文件

// 技术模块列表
const techModules = [
    '/js/navigation.js',
    '/js/table.js',
    '/js/tab.js',
    '/js/search.js',
    '/js/action.js',
    '/js/utils.js'
];

// 动态加载JS文件
function loadScript(url) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// 动态加载技术模块
function loadTechModules() {
    const promises = techModules.map(module => loadScript(module));
    return Promise.all(promises);
}

// 根据当前页面判断需要加载的业务模块
function getBusinessModule() {
    const pathname = window.location.pathname;
    
    if (pathname.includes('expert')) {
        return '/js/expert.js';
    } else if (pathname.includes('customer')) {
        return '/js/customer.js';
    } else if (pathname.includes('activity')) {
        return '/js/activity.js';
    } else if (pathname.includes('index') || pathname.endsWith('/')) {
        return '/js/home.js';
    } else {
        return null;
    }
}

// 初始化通用功能
function initCommonFeatures() {
    if (typeof initTabSwitching === 'function') {
        initTabSwitching();
    }
    
    if (typeof initSearchFunctionality === 'function') {
        initSearchFunctionality();
    }
    
    if (typeof initActionButtons === 'function') {
        initActionButtons();
    }
    
    if (typeof initTableInteraction === 'function') {
        initTableInteraction();
    }
    
    if (typeof initQuickFilters === 'function') {
        initQuickFilters();
    }
    
    if (typeof defaultFilterPending === 'function') {
        defaultFilterPending();
    }
    
    if (typeof updateViewDetailLinks === 'function') {
        updateViewDetailLinks();
    }
}

// 初始化业务模块
function initBusinessModule() {
    const pathname = window.location.pathname;
    
    if (pathname.includes('expert')) {
        if (typeof initExpertModule === 'function') {
            initExpertModule();
        }
    } else if (pathname.includes('customer')) {
        if (typeof initCustomerModule === 'function') {
            initCustomerModule();
        }
    } else if (pathname.includes('index') || pathname.endsWith('/')) {
        if (typeof initHomePage === 'function') {
            initHomePage();
        }
    }
}

// 页面加载完成后执行初始化
function initApp() {
    // 加载技术模块
    loadTechModules()
        .then(() => {
            // 加载组件
            if (typeof loadComponents === 'function') {
                return loadComponents();
            }
        })
        .then(() => {
            // 确保DOM完全渲染后再进行初始化
            return new Promise(resolve => {
                setTimeout(() => {
                    // 初始化导航交互
                    if (typeof initNavigationInteraction === 'function') {
                        initNavigationInteraction();
                    }
                    resolve();
                }, 50);
            });
        })
        .then(() => {
            // 初始化通用功能
            initCommonFeatures();
            
            // 加载业务模块
            const businessModule = getBusinessModule();
            if (businessModule) {
                return loadScript(businessModule);
            }
        })
        .then(() => {
            // 初始化业务模块
            initBusinessModule();
        })
        .catch(error => {
            console.error('Failed to load modules:', error);
        });
}

// 页面加载完成后执行初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    // 页面已经加载完成，直接执行初始化
    initApp();
}
