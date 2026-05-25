/**
 * 活动页面交互逻辑
 */
document.addEventListener('DOMContentLoaded', function() {
  // 初始化底部导航栏切换
  initFooterNavSwitch();
  
  // 初始化标签页切换
  initTabSwitch();
  
  // 初始化筛选标签切换
  initFilterSwitch();
  
  // 初始化搜索功能
  initSearch();
  
  // 初始化活动项点击事件
  initActivityClick();
  
  // 初始化调研项点击事件
  initSurveyClick();
  
  // 初始化头部按钮事件
  initHeaderButtons();
  
  // 初始化发现模块交互
  initDiscoverModule();
  
  // 初始化调研剩余时间显示
  initSurveyTimeDisplay();
  
  // 初始化推荐项点击事件
  initRecommendClick();
});

/**
 * 初始化调研剩余时间显示
 */
function initSurveyTimeDisplay() {
  const surveyItems = document.querySelectorAll('.survey-item');
  
  surveyItems.forEach(item => {
    const surveyDate = item.querySelector('.survey-date');
    if (surveyDate) {
      const dateText = surveyDate.textContent.trim();
      const expiryDateStr = dateText.replace('过期时间：', '');
      const timeLeft = calculateTimeLeft(expiryDateStr);
      
      // 创建剩余时间元素
      const timeLeftElement = document.createElement('span');
      timeLeftElement.className = 'survey-time-left';
      
      if (timeLeft.days >= 0) {
        if (timeLeft.days === 0) {
          timeLeftElement.textContent = '今天过期';
          timeLeftElement.style.color = '#ff4d4f';
          timeLeftElement.style.fontWeight = '600';
        } else if (timeLeft.days <= 3) {
          timeLeftElement.textContent = `剩余${timeLeft.days}天`;
          timeLeftElement.style.color = '#ff4d4f';
          timeLeftElement.style.fontWeight = '600';
        } else {
          timeLeftElement.textContent = `剩余${timeLeft.days}天`;
          timeLeftElement.style.color = '#52c41a';
        }
      } else {
        timeLeftElement.textContent = '已过期';
        timeLeftElement.style.color = '#999';
      }
      
      // 在过期时间后添加剩余时间
      surveyDate.appendChild(document.createTextNode(' • '));
      surveyDate.appendChild(timeLeftElement);
    }
  });
}

/**
 * 计算剩余时间
 * @param {string} expiryDateStr - 过期日期字符串 (YYYY.MM.DD)
 * @returns {Object} 剩余时间对象
 */
function calculateTimeLeft(expiryDateStr) {
  const [year, month, day] = expiryDateStr.split('.').map(Number);
  const expiryDate = new Date(year, month - 1, day, 23, 59, 59);
  const now = new Date();
  const difference = expiryDate - now;
  
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  
  return { days, hours, minutes };
}

/**
 * 初始化标签页切换
 */
function initTabSwitch() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  tabBtns.forEach((btn, index) => {
    btn.addEventListener('click', function() {
      // 移除所有标签的激活状态
      tabBtns.forEach(b => b.classList.remove('active'));
      // 添加当前标签的激活状态
      this.classList.add('active');
      
      // 隐藏所有标签内容
      tabPanels.forEach(panel => panel.classList.remove('active'));
      // 显示对应标签内容
      tabPanels[index].classList.add('active');
      
      // 获取标签文本
      const tabText = this.textContent.trim();
      console.log('切换到标签:', tabText);
    });
  });
}

/**
 * 初始化筛选标签切换
 */
function initFilterSwitch() {
  // 推荐标签页筛选
  const recommendFilterBtns = document.querySelectorAll('.recommend-filter .filter-btn');
  if (recommendFilterBtns.length > 0) {
    recommendFilterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        recommendFilterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filterText = this.textContent.trim();
        console.log('推荐筛选:', filterText);
      });
    });
  }
  
  // 活动标签页筛选
  const activityFilterBtns = document.querySelectorAll('.activity-filter .filter-btn');
  if (activityFilterBtns.length > 0) {
    activityFilterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        activityFilterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filterText = this.textContent.trim();
        console.log('活动筛选:', filterText);
      });
    });
  }
  
  // 调研标签页筛选
  const surveyFilterBtns = document.querySelectorAll('.survey-filter .filter-btn');
  if (surveyFilterBtns.length > 0) {
    surveyFilterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        surveyFilterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const filterText = this.textContent.trim();
        console.log('调研筛选:', filterText);
      });
    });
  }
}

/**
 * 初始化搜索功能
 */
function initSearch() {
  const searchInput = document.querySelector('.search-input');
  const searchBtn = document.querySelector('.search-btn');
  
  // 搜索按钮点击事件
  if (searchBtn) {
    searchBtn.addEventListener('click', function() {
      const searchText = searchInput.value.trim();
      console.log('搜索内容:', searchText);
      // 跳转到搜索页面
      alert('跳转到搜索页面，搜索内容：' + searchText);
      // 这里可以添加跳转到搜索页面的逻辑
    });
  }
  
  // 回车键搜索
  if (searchInput) {
    searchInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        const searchText = this.value.trim();
        console.log('搜索内容:', searchText);
        // 跳转到搜索页面
        alert('跳转到搜索页面，搜索内容：' + searchText);
        // 这里可以添加跳转到搜索页面的逻辑
      }
    });
  }
}

/**
 * 初始化活动项点击事件
 */
function initActivityClick() {
  const activityItems = document.querySelectorAll('.activity-item');
  
  activityItems.forEach(item => {
    item.addEventListener('click', function() {
      // 获取活动标题
      const activityTitle = this.querySelector('.activity-title').textContent.trim();
      console.log('点击活动:', activityTitle);
      // 这里可以添加跳转到活动详情页的逻辑
    });
  });
}

/**
 * 初始化调研项点击事件
 */
function initSurveyClick() {
  const surveyItems = document.querySelectorAll('.survey-item');
  
  surveyItems.forEach(item => {
    item.addEventListener('click', function() {
      // 获取调研标题
      const surveyTitle = this.querySelector('.survey-title').textContent.trim();
      console.log('点击调研:', surveyTitle);
      // 这里可以添加跳转到调研详情页的逻辑
    });
  });
}

/**
 * 初始化推荐项点击事件
 */
function initRecommendClick() {
  const recommendItems = document.querySelectorAll('.recommend-item');
  
  recommendItems.forEach(item => {
    item.addEventListener('click', function() {
      // 获取推荐活动标题
      const recommendTitle = this.querySelector('.recommend-title').textContent.trim();
      console.log('点击推荐学术内容:', recommendTitle);
      // 这里可以添加跳转到学术内容详情页的逻辑
    });
  });
}

/**
 * 初始化头部按钮事件
 */
function initHeaderButtons() {
  // 等待头部组件加载完成
  setTimeout(() => {
    const backBtn = document.querySelector('.app-header-back-btn');
    const moreBtn = document.querySelector('.app-header-more-btn');
    
    // 更多按钮点击事件
    if (moreBtn) {
      moreBtn.addEventListener('click', function() {
        console.log('点击更多按钮');
        // 这里可以添加显示更多选项的逻辑
      });
    }
  }, 100);
}

/**
 * 初始化发现模块交互
 */
function initDiscoverModule() {
  // 初始化发现模块标签页切换
  initDiscoverTabSwitch();
  
  // 初始化发现模块分类标签切换
  initDiscoverCategorySwitch();
  
  // 初始化发现模块分页切换
  initDiscoverPagination();
  
  // 初始化直播项点击事件
  initLiveItemClick();
}

/**
 * 初始化发现模块标签页切换
 */
function initDiscoverTabSwitch() {
  const tabBtns = document.querySelectorAll('.discover-tab-btn');
  
  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // 移除所有标签的激活状态
        tabBtns.forEach(b => b.classList.remove('active'));
        // 添加当前标签的激活状态
        this.classList.add('active');
        
        // 获取标签文本
        const tabText = this.textContent.trim();
        console.log('切换到发现标签:', tabText);
        // 这里可以添加对应标签内容的切换逻辑
      });
    });
  }
}

/**
 * 初始化发现模块分类标签切换
 */
function initDiscoverCategorySwitch() {
  const categoryBtns = document.querySelectorAll('.category-btn');
  
  if (categoryBtns.length > 0) {
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // 移除所有分类标签的激活状态
        categoryBtns.forEach(b => b.classList.remove('active'));
        // 添加当前分类标签的激活状态
        this.classList.add('active');
        
        // 获取分类文本
        const categoryText = this.textContent.trim();
        console.log('切换到分类:', categoryText);
        // 这里可以添加对应分类内容的筛选逻辑
      });
    });
  }
}

/**
 * 初始化发现模块分页切换
 */
function initDiscoverPagination() {
  const pageBtns = document.querySelectorAll('.page-btn');
  
  if (pageBtns.length > 0) {
    pageBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // 获取按钮文本
        const pageText = this.textContent.trim();
        
        // 如果是页码按钮
        if (!isNaN(pageText)) {
          // 移除所有页码按钮的激活状态
          pageBtns.forEach(b => b.classList.remove('active'));
          // 添加当前页码按钮的激活状态
          this.classList.add('active');
          console.log('切换到页码:', pageText);
          // 这里可以添加对应页码内容的加载逻辑
        } else if (pageText === '‹') {
          // 上一页
          console.log('点击上一页');
          // 这里可以添加上一页逻辑
        } else if (pageText === '›') {
          // 下一页
          console.log('点击下一页');
          // 这里可以添加下一页逻辑
        }
      });
    });
  }
}

/**
 * 初始化直播项点击事件
 */
function initLiveItemClick() {
  const liveItems = document.querySelectorAll('.live-item');
  
  if (liveItems.length > 0) {
    liveItems.forEach(item => {
      item.addEventListener('click', function() {
        // 获取直播标题
        const liveTitle = this.querySelector('.live-title').textContent.trim();
        console.log('点击直播:', liveTitle);
        // 这里可以添加跳转到直播详情页的逻辑
      });
    });
  }
}

/**
 * 初始化底部导航栏切换
 */
function initFooterNavSwitch() {
  // 等待底部组件加载完成
  setTimeout(() => {
    const navItems = document.querySelectorAll('.footer-nav-item');
    
    // 为每个导航项添加点击事件（仅用于更新激活状态）
    navItems.forEach((item, index) => {
      item.addEventListener('click', function() {
        // 移除所有导航项的激活状态
        navItems.forEach(navItem => navItem.classList.remove('active'));
        // 添加当前导航项的激活状态
        this.classList.add('active');
      });
    });
  }, 100);
}

/**
 * 更新头部标题
 * @param {number} index - 导航项索引
 */
