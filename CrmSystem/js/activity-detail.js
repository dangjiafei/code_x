document.addEventListener('DOMContentLoaded', function() {
    initTabSwitch();
    initEnterpriseDetailModal();
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

function initEnterpriseDetailModal() {
    document.querySelectorAll('.btn-view-enterprise').forEach(btn => {
        btn.addEventListener('click', function() {
            openEnterpriseDetailModal(this.closest('tr'));
        });
    });

    const modal = document.getElementById('enterpriseDetailModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('modal-close')) {
            closeEnterpriseDetailModal();
        }
    });
}

function openEnterpriseDetailModal(row) {
    if (!row) return;

    const cells = row.querySelectorAll('td');
    const conditionTags = Array.from(cells[3].querySelectorAll('.tag')).map(tag => tag.textContent.trim());
    const status = cells[7].textContent.trim();

    document.getElementById('enterpriseModalTitle').textContent = cells[0].textContent.trim();
    document.getElementById('enterpriseModalSubtitle').textContent = '活动参与明细';
    document.getElementById('enterpriseUseTime').textContent = cells[1].textContent.trim();
    document.getElementById('enterpriseTargetCount').textContent = cells[2].textContent.trim();
    document.getElementById('enterpriseMatchedDoctors').textContent = cells[4].textContent.trim();
    document.getElementById('enterpriseSubmissionCount').textContent = cells[5].textContent.trim();
    document.getElementById('enterprisePurchasedCount').textContent = cells[6].textContent.trim();
    document.getElementById('enterpriseRecruitStatus').textContent = status;

    const tagsContainer = document.getElementById('enterpriseConditionTags');
    tagsContainer.innerHTML = conditionTags.map(tag => `<span class="tag">${tag}</span>`).join('');

    document.getElementById('enterpriseDetailModal').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeEnterpriseDetailModal() {
    document.getElementById('enterpriseDetailModal').style.display = 'none';
    document.body.style.overflow = '';
}

function initSurveyModal() {
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.view-detail');
        if (btn) {
            const themeName = btn.getAttribute('data-theme');
            openSurveyModal(themeName);
        }

        const answerBtn = e.target.closest('.survey-answer-detail');
        if (answerBtn) {
            openSurveyAnswerModal(
                answerBtn.getAttribute('data-doctor'),
                answerBtn.getAttribute('data-title')
            );
        }
    });
    
    const modal = document.getElementById('surveyModal');
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('modal-close')) {
            closeSurveyModal();
        }
    });

    const answerModal = document.getElementById('surveyAnswerModal');
    answerModal.addEventListener('click', function(e) {
        if (e.target === answerModal || e.target.classList.contains('modal-close')) {
            closeSurveyAnswerModal();
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

function openSurveyAnswerModal(doctorInfo, contentTitle) {
    const modal = document.getElementById('surveyAnswerModal');
    const subtitle = document.getElementById('answerModalSubtitle');
    const title = document.getElementById('answerContentTitle');

    subtitle.textContent = doctorInfo || '医生信息';
    title.textContent = contentTitle || '-';
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeSurveyAnswerModal() {
    const modal = document.getElementById('surveyAnswerModal');
    modal.style.display = 'none';

    const surveyModal = document.getElementById('surveyModal');
    if (surveyModal.style.display !== 'flex') {
        document.body.style.overflow = '';
    }
}
