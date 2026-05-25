/**
 * 加载HTML组件到指定容器
 * @param {string} componentPath - 组件文件路径
 * @param {string} containerId - 容器ID
 * @param {Object} params - 传递给组件的参数
 */
function loadComponent(componentPath, containerId, params = {}) {
  fetch(componentPath)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then(data => {
      const container = document.getElementById(containerId);
      if (container) {
        // 替换组件中的模板变量
        let processedData = data;
        for (const [key, value] of Object.entries(params)) {
          processedData = processedData.replace(new RegExp(`\{\{${key}\}\}`, 'g'), value);
        }
        container.innerHTML = processedData;
      }
    })
    .catch(error => {
      console.error('Error loading component:', error);
    });
}

/**
 * 初始化页面公共组件
 * @param {Object} options - 页面选项，包含标题等信息
 */
function initPageComponents(options = {}) {
  const {
    title = '活动' // 默认标题
  } = options;
  
  // 加载状态栏组件
  loadComponent('./components/status-bar.html', 'status-bar-container');
  
  // 加载头部组件（传递标题参数）
  loadComponent('./components/header.html', 'header-container', { title });
  
  // 加载底部组件
  loadComponent('./components/footer.html', 'footer-container');
  
  // 等待底部组件加载完成后更新激活状态
  setTimeout(() => {
    updateFooterNavActiveStatus();
  }, 100);
}

/**
 * 根据当前URL更新底部导航栏激活状态
 */
function updateFooterNavActiveStatus() {
  const navItems = document.querySelectorAll('.footer-nav-item');
  if (!navItems.length) return;
  
  // 获取当前URL路径
  const currentPath = window.location.pathname;
  
  // 移除所有导航项的激活状态
  navItems.forEach(item => item.classList.remove('active'));
  
  // 根据路径设置激活状态
  if (currentPath.includes('activities.html')) {
    navItems[0].classList.add('active');
  } else if (currentPath.includes('discover.html')) {
    navItems[1].classList.add('active');
  } else if (currentPath.includes('doctor-home.html')) {
    navItems[2].classList.add('active');
  } else if (currentPath.includes('mine.html')) {
    navItems[3].classList.add('active');
  }
}

// 页面加载完成后初始化组件的逻辑已移至各页面单独处理，
// 这样可以确保传递正确的页面标题参数