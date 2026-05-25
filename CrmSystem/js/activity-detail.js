document.addEventListener('DOMContentLoaded', function() {
    initTabSwitch();
    initExpandableRows();
    initSurveyModal();
});

function goBack() {
    window.location.href = 'activity-list.html';
}

function editActivity() {
    const params = new URLSearchParams(window.location.search);
    const activityId = params.get('id');
    const query = activityId ? `?mode=edit&id=${encodeURIComponent(activityId)}` : '?mode=edit';
    window.location.href = `activity-create.html${query}`;
}

function initTabSwitch() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.tab-pane').forEach(pane => {
                pane.classList.remove('active');
            });
            
            const targetPane = document.getElementById(`tab-${tabId}`);
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}

function initExpandableRows() {
    const expandButtons = document.querySelectorAll('.btn-expand');
    
    expandButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const nextRow = row.nextElementSibling;
            
            if (nextRow && nextRow.classList.contains('expanded-content')) {
                if (nextRow.style.display === 'none') {
                    nextRow.style.display = 'table-row';
                    this.textContent = '收起';
                } else {
                    nextRow.style.display = 'none';
                    this.textContent = '展开';
                }
            }
        });
    });
    
    document.querySelectorAll('.expanded-content').forEach(row => {
        row.style.display = 'none';
    });
}

function initSurveyModal() {
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.view-detail');
        if (btn) {
            const themeName = btn.getAttribute('data-theme');
            openSurveyModal(themeName);
        }
    });
    
    const modal = document.getElementById('surveyModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('modal-close')) {
            closeSurveyModal();
        }
    });
}

function openSurveyModal(themeName) {
    const modal = document.getElementById('surveyModal');
    const title = document.getElementById('modalThemeTitle');
    title.textContent = themeName;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeSurveyModal() {
    const modal = document.getElementById('surveyModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
}
