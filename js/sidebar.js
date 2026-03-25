/**
 * ReDefiners — Dynamic Sidebar Navigation
 *
 * Renders context-aware sidebar with sub-menus:
 * - Global context: Dashboard, Courses (with enrolled list), Calendar, Inbox, Account
 * - Course context: Course-specific navigation (Assignments, Quizzes, Modules, etc.)
 * - Admin context: Admin tools (User Management, Reports, etc.)
 *
 * Sub-menus expand/collapse on click with smooth animation.
 */

class ReDefinersSidebar {
    constructor() {
        this.router = window.ReDefinersRouter;
        this.currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
        this.courseId = this.router.getCourseId();
        this._courses = null;
        this._userRole = 'student'; // student, teacher, admin
    }

    /**
     * Initialize sidebar - call after auth check
     */
    async init(user) {
        if (user) {
            // Detect role from user data
            if (user.permissions?.can_manage_account || user.permissions?.become_user) {
                this._userRole = 'admin';
            }
        }

        // Load courses for the sidebar
        try {
            const api = window.ReDefinersAPI;
            if (api) {
                const { data: courses } = await api.courses.list();
                this._courses = courses || [];
            }
        } catch (e) {
            this._courses = [];
        }

        this._render();
        this._bindEvents();
    }

    /**
     * Render the sidebar menu
     */
    _render() {
        const menuLinks = document.querySelector('.menu-links');
        if (!menuLinks) return;

        // Determine context
        const isCoursePage = !!this.courseId;
        const coursePages = [
            'class.html', 'course-home.html', 'announcement.html', 'announcements-list.html',
            'assignments.html', 'assignment-detail.html', 'submission.html', 'submit-assignment.html',
            'quizzes.html', 'quiz-take.html', 'quiz-results.html', 'quiz-show.html', 'quiz-statistics.html',
            'discussions.html', 'discussion-thread.html', 'discussion-edit.html',
            'modules.html', 'grades.html', 'gradebook.html', 'speed-grader.html',
            'pages.html', 'page-view.html', 'wiki-page-edit.html',
            'files.html', 'file-preview.html', 'file-details.html',
            'people.html', 'syllabus.html', 'outcomes.html', 'rubrics.html',
            'groups.html', 'conferences.html', 'collaborations.html',
            'course-settings.html', 'analytics.html', 'course-statistics.html',
            'peer-review.html', 'assignment-peer-reviews.html',
        ];

        let html = '';

        if (isCoursePage || coursePages.includes(this.currentPage)) {
            html = this._renderCourseNav();
        } else {
            html = this._renderGlobalNav();
        }

        menuLinks.innerHTML = html;
    }

    /**
     * Global navigation (Dashboard, Courses, Calendar, Inbox, Account)
     */
    _renderGlobalNav() {
        const p = this.currentPage;
        const r = this.router;

        let coursesSubMenu = '';
        if (this._courses && this._courses.length > 0) {
            const courseItems = this._courses.slice(0, 8).map(c => {
                const name = c.name.length > 25 ? c.name.substring(0, 25) + '...' : c.name;
                return `<div class="menu-link sub-menu-item"><a href="${r.buildUrl('class.html', { course_id: c.id })}"><i class="fa fa-circle tw-text-[8px]"></i><span> ${this._escapeHtml(name)}</span></a></div>`;
            }).join('');
            coursesSubMenu = `<div class="sub-menu" style="display:none">${courseItems}
                <div class="menu-link sub-menu-item"><a href="all-courses.html"><i class="fa fa-ellipsis-h"></i><span> View All Courses</span></a></div>
            </div>`;
        }

        const accountSubMenu = `<div class="sub-menu" style="display:none">
            <div class="menu-link sub-menu-item"><a href="profile.html" class="${p === 'profile.html' ? 'active-menu' : ''}"><i class="fa fa-circle tw-text-[8px]"></i><span> Profile</span></a></div>
            <div class="menu-link sub-menu-item"><a href="account-settings.html" class="${p === 'account-settings.html' ? 'active-menu' : ''}"><i class="fa fa-circle tw-text-[8px]"></i><span> Settings</span></a></div>
            <div class="menu-link sub-menu-item"><a href="notifications.html" class="${p === 'notifications.html' ? 'active-menu' : ''}"><i class="fa fa-circle tw-text-[8px]"></i><span> Notifications</span></a></div>
            <div class="menu-link sub-menu-item"><a href="eportfolio.html" class="${p === 'eportfolio.html' ? 'active-menu' : ''}"><i class="fa fa-circle tw-text-[8px]"></i><span> ePortfolio</span></a></div>
            <div class="menu-link sub-menu-item"><a href="change-password.html" class="${p === 'change-password.html' ? 'active-menu' : ''}"><i class="fa fa-circle tw-text-[8px]"></i><span> Change Password</span></a></div>
        </div>`;

        let adminSection = '';
        if (this._userRole === 'admin') {
            const adminSubMenu = `<div class="sub-menu" style="display:none">
                <div class="menu-link sub-menu-item"><a href="user-management.html"><i class="fa fa-circle tw-text-[8px]"></i><span> Users</span></a></div>
                <div class="menu-link sub-menu-item"><a href="reports.html"><i class="fa fa-circle tw-text-[8px]"></i><span> Reports</span></a></div>
                <div class="menu-link sub-menu-item"><a href="developer-keys.html"><i class="fa fa-circle tw-text-[8px]"></i><span> Developer Keys</span></a></div>
                <div class="menu-link sub-menu-item"><a href="permissions.html"><i class="fa fa-circle tw-text-[8px]"></i><span> Permissions</span></a></div>
                <div class="menu-link sub-menu-item"><a href="authentication-providers.html"><i class="fa fa-circle tw-text-[8px]"></i><span> Authentication</span></a></div>
                <div class="menu-link sub-menu-item"><a href="sub-accounts.html"><i class="fa fa-circle tw-text-[8px]"></i><span> Sub-Accounts</span></a></div>
                <div class="menu-link sub-menu-item"><a href="sis-import.html"><i class="fa fa-circle tw-text-[8px]"></i><span> SIS Import</span></a></div>
            </div>`;

            adminSection = `
                <div class="menu-divider"><span>Administration</span></div>
                <div class="menu-link has-submenu"><a href="admin-dashboard.html" class="${p === 'admin-dashboard.html' ? 'active-menu' : ''}"><i class="fa fa-shield-alt"></i><span> Admin</span><i class="fa fa-chevron-down submenu-arrow tw-text-xs tw-ml-auto"></i></a></div>
                ${adminSubMenu}`;
        }

        return `
            <div class="menu-link"><a href="dashboard.html" class="${p === 'dashboard.html' ? 'active-menu' : ''}"><i class="fa fa-th-large"></i><span> Dashboard</span></a></div>
            <div class="menu-link has-submenu"><a href="courses.html" class="${p === 'courses.html' ? 'active-menu' : ''}"><i class="fa fa-clipboard-list"></i><span> Courses</span><i class="fa fa-chevron-down submenu-arrow tw-text-xs tw-ml-auto"></i></a></div>
            ${coursesSubMenu}
            <div class="menu-link"><a href="calendar.html" class="${p === 'calendar.html' ? 'active-menu' : ''}"><i class="fa fa-calendar-alt"></i><span> Calendar</span></a></div>
            <div class="menu-link"><a href="inbox.html" class="${p === 'inbox.html' ? 'active-menu' : ''}"><i class="fa fa-comments"></i><span> Inbox</span><span class="unread-badge" style="display:none"></span></a></div>
            <div class="menu-link"><a href="planner.html" class="${p === 'planner.html' ? 'active-menu' : ''}"><i class="fa fa-tasks"></i><span> Planner</span></a></div>

            <div class="menu-divider"><span>Account</span></div>
            <div class="menu-link has-submenu"><a href="profile.html" class="${['profile.html', 'account-settings.html', 'notifications.html'].includes(p) ? 'active-menu' : ''}"><i class="fa fa-user-circle"></i><span> Account</span><i class="fa fa-chevron-down submenu-arrow tw-text-xs tw-ml-auto"></i></a></div>
            ${accountSubMenu}
            ${adminSection}
        `;
    }

    /**
     * Course context navigation
     */
    _renderCourseNav() {
        const p = this.currentPage;
        const cid = this.courseId;
        const r = this.router;
        const b = (page) => r.buildUrl(page, { course_id: cid });
        const isActive = (pages) => pages.includes(p) ? 'active-menu' : '';

        // Find course name
        let courseName = 'Course';
        if (this._courses) {
            const course = this._courses.find(c => String(c.id) === String(cid));
            if (course) courseName = course.name.length > 22 ? course.name.substring(0, 22) + '...' : course.name;
        }

        const assessmentSub = `<div class="sub-menu" style="display:none">
            <div class="menu-link sub-menu-item"><a href="${b('rubrics.html')}" class="${isActive(['rubrics.html'])}"><i class="fa fa-circle tw-text-[8px]"></i><span> Rubrics</span></a></div>
            <div class="menu-link sub-menu-item"><a href="${b('outcomes.html')}" class="${isActive(['outcomes.html'])}"><i class="fa fa-circle tw-text-[8px]"></i><span> Outcomes</span></a></div>
            <div class="menu-link sub-menu-item"><a href="${b('speed-grader.html')}" class="${isActive(['speed-grader.html'])}"><i class="fa fa-circle tw-text-[8px]"></i><span> SpeedGrader</span></a></div>
            <div class="menu-link sub-menu-item"><a href="${b('gradebook.html')}" class="${isActive(['gradebook.html'])}"><i class="fa fa-circle tw-text-[8px]"></i><span> Gradebook</span></a></div>
        </div>`;

        return `
            <div class="menu-link"><a href="dashboard.html"><i class="fa fa-arrow-left"></i><span> Back to Dashboard</span></a></div>
            <div class="menu-divider"><span>${this._escapeHtml(courseName)}</span></div>
            <div class="menu-link"><a href="${b('class.html')}" class="${isActive(['class.html', 'course-home.html'])}"><i class="fa fa-home"></i><span> Home</span></a></div>
            <div class="menu-link"><a href="${b('announcement.html')}" class="${isActive(['announcement.html', 'announcements-list.html'])}"><i class="fa fa-bullhorn"></i><span> Announcements</span></a></div>
            <div class="menu-link"><a href="${b('assignments.html')}" class="${isActive(['assignments.html', 'assignment-detail.html', 'submission.html'])}"><i class="fa fa-file-lines"></i><span> Assignments</span></a></div>
            <div class="menu-link"><a href="${b('quizzes.html')}" class="${isActive(['quizzes.html', 'quiz-take.html', 'quiz-results.html', 'quiz-show.html'])}"><i class="fa fa-question-circle"></i><span> Quizzes</span></a></div>
            <div class="menu-link"><a href="${b('discussions.html')}" class="${isActive(['discussions.html', 'discussion-thread.html'])}"><i class="fa fa-comments-alt"></i><span> Discussions</span></a></div>
            <div class="menu-link"><a href="${b('modules.html')}" class="${isActive(['modules.html'])}"><i class="fa fa-layer-group"></i><span> Modules</span></a></div>
            <div class="menu-link"><a href="${b('grades.html')}" class="${isActive(['grades.html'])}"><i class="fa fa-chart-bar"></i><span> Grades</span></a></div>
            <div class="menu-link"><a href="${b('pages.html')}" class="${isActive(['pages.html', 'page-view.html', 'wiki-page-edit.html'])}"><i class="fa fa-file-alt"></i><span> Pages</span></a></div>
            <div class="menu-link"><a href="${b('files.html')}" class="${isActive(['files.html', 'file-preview.html'])}"><i class="fa fa-folder"></i><span> Files</span></a></div>
            <div class="menu-link"><a href="${b('people.html')}" class="${isActive(['people.html'])}"><i class="fa fa-users"></i><span> People</span></a></div>
            <div class="menu-link"><a href="${b('syllabus.html')}" class="${isActive(['syllabus.html'])}"><i class="fa fa-book-open"></i><span> Syllabus</span></a></div>

            <div class="menu-divider"><span>Assessment</span></div>
            <div class="menu-link has-submenu"><a href="${b('grades.html')}" class="${isActive(['rubrics.html', 'outcomes.html', 'speed-grader.html', 'gradebook.html'])}"><i class="fa fa-star"></i><span> Assessment</span><i class="fa fa-chevron-down submenu-arrow tw-text-xs tw-ml-auto"></i></a></div>
            ${assessmentSub}

            <div class="menu-divider"><span>Collaborate</span></div>
            <div class="menu-link"><a href="${b('groups.html')}" class="${isActive(['groups.html'])}"><i class="fa fa-user-friends"></i><span> Groups</span></a></div>
            <div class="menu-link"><a href="${b('conferences.html')}" class="${isActive(['conferences.html'])}"><i class="fa fa-video"></i><span> Conferences</span></a></div>
            <div class="menu-link"><a href="${b('collaborations.html')}" class="${isActive(['collaborations.html'])}"><i class="fa fa-handshake"></i><span> Collaborations</span></a></div>
            <div class="menu-link"><a href="${b('analytics.html')}" class="${isActive(['analytics.html', 'course-statistics.html'])}"><i class="fa fa-chart-line"></i><span> Analytics</span></a></div>
            <div class="menu-link"><a href="${b('course-settings.html')}" class="${isActive(['course-settings.html'])}"><i class="fa fa-cog"></i><span> Settings</span></a></div>
        `;
    }

    /**
     * Bind click events for sub-menu toggles
     */
    _bindEvents() {
        document.querySelectorAll('.has-submenu > a').forEach(link => {
            link.addEventListener('click', (e) => {
                const subMenu = link.closest('.has-submenu').nextElementSibling;
                if (subMenu && subMenu.classList.contains('sub-menu')) {
                    e.preventDefault();
                    const isOpen = subMenu.style.display !== 'none';
                    subMenu.style.display = isOpen ? 'none' : 'block';

                    // Rotate arrow
                    const arrow = link.querySelector('.submenu-arrow');
                    if (arrow) {
                        arrow.style.transform = isOpen ? 'rotate(0deg)' : 'rotate(180deg)';
                    }
                }
            });
        });

        // Auto-expand sub-menu if current page is inside it
        document.querySelectorAll('.sub-menu').forEach(sub => {
            const hasActive = sub.querySelector('.active-menu');
            if (hasActive) {
                sub.style.display = 'block';
                const arrow = sub.previousElementSibling?.querySelector('.submenu-arrow');
                if (arrow) arrow.style.transform = 'rotate(180deg)';
            }
        });
    }

    /**
     * Escape HTML to prevent XSS
     */
    _escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }
}

// Export as global
window.ReDefinersSidebar = new ReDefinersSidebar();
