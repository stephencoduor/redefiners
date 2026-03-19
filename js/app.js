/**
 * ReDefiners — Application Controller
 *
 * Page initialization, shared behaviors, and Canvas API bootstrapping.
 * Include this on every page after api.js and render.js.
 *
 * <script src="js/api.js"></script>
 * <script src="js/render.js"></script>
 * <script src="js/app.js"></script>
 */

(function () {
    'use strict';

    const api = window.ReDefinersAPI;
    const render = window.ReDefinersRenderer;

    // ═══════════════════════════════════════
    // URL Parameter Helpers
    // ═══════════════════════════════════════

    function getParam(name) {
        return new URLSearchParams(window.location.search).get(name);
    }

    function getCourseId() {
        return getParam('course_id');
    }

    // ═══════════════════════════════════════
    // Global: Top Bar User Profile
    // ═══════════════════════════════════════

    async function initTopBar() {
        try {
            const { data: profile } = await api.users.profile();

            // Update avatar
            const avatars = document.querySelectorAll('.nav-avatar, .top-avatar');
            avatars.forEach(img => {
                if (profile.avatar_url) img.src = profile.avatar_url;
            });

            // Update welcome message
            const welcomeName = document.querySelector('.welcome-sec h3, .welcome-name');
            if (welcomeName && profile.short_name) {
                welcomeName.textContent = `Welcome, ${profile.short_name}!`;
            }

            // Notification badge
            try {
                const { data: unread } = await api.conversations.unreadCount();
                if (unread?.unread_count) {
                    render.updateNotificationBadge(parseInt(unread.unread_count));
                }
            } catch (e) { /* notification count is non-critical */ }

        } catch (error) {
            if (error.isUnauthorized) {
                window.location.href = 'login.html';
            }
            console.error('[TopBar] Failed to load profile:', error);
        }
    }

    // ═══════════════════════════════════════
    // Page: Dashboard
    // ═══════════════════════════════════════

    async function initDashboard() {
        // Courses
        try {
            const { data: courses } = await api.courses.list();
            const courseContainer = document.querySelector('.video-carousel, .course-carousel-container');
            if (courseContainer && courses) {
                render.courseCardList(courses.slice(0, 6), courseContainer);
            }
        } catch (e) { console.error('[Dashboard] Courses:', e); }

        // To-Do
        try {
            const { data: todoItems } = await api.users.todo();
            const todoContainer = document.querySelector('.todo-container, .right-end');
            if (todoContainer && todoItems) {
                render.todoList(todoItems.slice(0, 8), todoContainer);
            }
        } catch (e) { console.error('[Dashboard] Todo:', e); }

        // Upcoming events for calendar widget
        try {
            const now = new Date();
            const endDate = new Date(now);
            endDate.setDate(endDate.getDate() + 14);
            const { data: events } = await api.calendar.all(
                now.toISOString().split('T')[0],
                endDate.toISOString().split('T')[0]
            );
            const eventContainer = document.querySelector('.calendar-events, .right-sidebar .calendar-list');
            if (eventContainer && events) {
                events.slice(0, 5).forEach(ev => eventContainer.appendChild(render.calendarEvent(ev)));
            }
        } catch (e) { console.error('[Dashboard] Calendar:', e); }
    }

    // ═══════════════════════════════════════
    // Page: Courses
    // ═══════════════════════════════════════

    async function initCourses() {
        const container = document.querySelector('.course-list-container, .video-carousel');
        if (!container) return;

        render.showLoading(container, 'card', 4);

        try {
            const { data: courses } = await api.courses.list();
            render.courseCardList(courses, container);
        } catch (e) {
            console.error('[Courses]', e);
            container.innerHTML = '';
            container.appendChild(render.emptyState('Error loading courses', e.message));
        }
    }

    // ═══════════════════════════════════════
    // Page: Assignments Index
    // ═══════════════════════════════════════

    async function initAssignments() {
        const courseId = getCourseId();
        if (!courseId) return;

        const container = document.querySelector('.assignments-container, #assign');
        if (!container) return;

        render.showLoading(container, 'row', 6);

        try {
            const { data: groups } = await api.assignments.groups(courseId);
            render.assignmentGroupList(groups, container);
        } catch (e) {
            console.error('[Assignments]', e);
            container.innerHTML = '';
            container.appendChild(render.emptyState('Error loading assignments', e.message));
        }
    }

    // ═══════════════════════════════════════
    // Page: Grades
    // ═══════════════════════════════════════

    async function initGrades() {
        const courseId = getCourseId();
        if (!courseId) return;

        const container = document.querySelector('.grades-container, #assign');
        if (!container) return;

        render.showLoading(container, 'row', 8);

        try {
            const [groupsRes, enrollmentsRes] = await Promise.all([
                api.grades.assignmentGroupsWithGrades(courseId),
                api.grades.enrollments(courseId),
            ]);

            const enrollment = enrollmentsRes.data?.find(e => e.type === 'StudentEnrollment');
            const totalGrade = enrollment?.grades?.current_score;

            render.gradesTable(groupsRes.data, totalGrade, container);
        } catch (e) {
            console.error('[Grades]', e);
            container.innerHTML = '';
            container.appendChild(render.emptyState('Error loading grades', e.message));
        }
    }

    // ═══════════════════════════════════════
    // Page: Modules
    // ═══════════════════════════════════════

    async function initModules() {
        const courseId = getCourseId();
        if (!courseId) return;

        const container = document.querySelector('.modules-container, #assign');
        if (!container) return;

        render.showLoading(container, 'row', 5);

        try {
            const { data: modules } = await api.modules.list(courseId);
            render.moduleList(modules, container);
        } catch (e) {
            console.error('[Modules]', e);
            container.innerHTML = '';
            container.appendChild(render.emptyState('Error loading modules', e.message));
        }
    }

    // ═══════════════════════════════════════
    // Page: Calendar
    // ═══════════════════════════════════════

    async function initCalendar() {
        // Calendar page has its own Materialize-based calendar.
        // This enhances it with Canvas event data.
        try {
            const now = new Date();
            const startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0];
            const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0];

            const [eventsRes, assignmentsRes] = await Promise.all([
                api.calendar.events(startDate, endDate),
                api.calendar.assignments(startDate, endDate),
            ]);

            const allEvents = [...(eventsRes.data || []), ...(assignmentsRes.data || [])];

            // Highlight dates with events on the calendar grid
            allEvents.forEach(event => {
                const date = new Date(event.start_at || event.assignment?.due_at);
                if (!date) return;
                const day = date.getDate();
                const cell = document.querySelector(`td[data-day="${day}"]`);
                if (cell) {
                    cell.classList.add('blue-td');
                    cell.style.cursor = 'pointer';
                    cell.title = event.title;
                }
            });

            // Populate event list
            const listContainer = document.querySelector('.event-list, .calendar-events');
            if (listContainer) {
                listContainer.innerHTML = '';
                if (allEvents.length === 0) {
                    listContainer.appendChild(render.el('p', '', {
                        text: 'No events this month',
                        style: 'color:var(--text-muted);font-size:13px;',
                    }));
                } else {
                    allEvents
                        .sort((a, b) => new Date(a.start_at || a.assignment?.due_at) - new Date(b.start_at || b.assignment?.due_at))
                        .forEach(ev => listContainer.appendChild(render.calendarEvent(ev)));
                }
            }
        } catch (e) {
            console.error('[Calendar]', e);
        }
    }

    // ═══════════════════════════════════════
    // Page: Announcements
    // ═══════════════════════════════════════

    async function initAnnouncements() {
        try {
            const { data: courses } = await api.courses.list();
            const contextCodes = courses.map(c => `course_${c.id}`);

            const { data: announcements } = await api.announcements.list(contextCodes);

            const tbody = document.querySelector('.table-inside1 tbody, .announce-table tbody');
            if (tbody && announcements) {
                tbody.innerHTML = '';
                if (announcements.length === 0) {
                    const row = document.createElement('tr');
                    row.innerHTML = '<td colspan="4" style="text-align:center;padding:40px;color:var(--text-muted);">No announcements</td>';
                    tbody.appendChild(row);
                } else {
                    announcements.forEach(a => tbody.appendChild(render.announcementRow(a)));
                }
            }
        } catch (e) {
            console.error('[Announcements]', e);
        }
    }

    // ═══════════════════════════════════════
    // Page: Inbox
    // ═══════════════════════════════════════

    async function initInbox() {
        const listContainer = document.querySelector('.mess-form, .inbox-left .people-sec');
        if (!listContainer) return;

        render.showLoading(listContainer, 'row', 5);

        try {
            const { data: conversations } = await api.conversations.list();
            listContainer.innerHTML = '';
            if (!conversations || conversations.length === 0) {
                listContainer.appendChild(render.emptyState('No messages', 'Your inbox is empty.'));
            } else {
                conversations.forEach(conv => listContainer.appendChild(render.conversationRow(conv)));
            }

            // Load specific conversation if ID in URL
            const convId = getParam('id');
            if (convId) {
                const { data: thread } = await api.conversations.get(convId);
                const threadContainer = document.querySelector('.real-mess, .inbox-right');
                if (threadContainer && thread) {
                    threadContainer.innerHTML = '';
                    (thread.messages || []).forEach(msg => {
                        const msgEl = render.el('div', '', { style: 'margin:15px 0;' });
                        const header = render.el('div', 'real-mess-inn');
                        header.appendChild(render.el('img', '', {
                            src: msg.avatar_url || 'Images/image1.png',
                            style: 'width:35px;height:35px;border-radius:100%;',
                        }));
                        const body = render.el('div', 'mess-body', { html: msg.body });
                        header.appendChild(body);
                        msgEl.appendChild(header);
                        msgEl.appendChild(render.el('h5', '', { text: render.formatDateTime(msg.created_at) }));
                        threadContainer.appendChild(msgEl);
                    });
                }
            }
        } catch (e) {
            console.error('[Inbox]', e);
            listContainer.innerHTML = '';
            listContainer.appendChild(render.emptyState('Error loading messages', e.message));
        }
    }

    // ═══════════════════════════════════════
    // Page: Profile
    // ═══════════════════════════════════════

    async function initProfile() {
        try {
            const { data: profile } = await api.users.profile();

            // Update profile image
            const profileImg = document.querySelector('.profile-img img, .message-pro img');
            if (profileImg && profile.avatar_url) profileImg.src = profile.avatar_url;

            // Update name
            const nameEl = document.querySelector('.pr-inn h5, .message-pro h5');
            if (nameEl) nameEl.textContent = profile.name;

            // Update email
            const emailEl = document.querySelector('.pr-inn p');
            if (emailEl) emailEl.textContent = profile.primary_email || '';

            // Update bio
            const bioEl = document.querySelector('.about p');
            if (bioEl && profile.bio) bioEl.textContent = profile.bio;

        } catch (e) {
            console.error('[Profile]', e);
        }
    }

    // ═══════════════════════════════════════
    // Page Router
    // ═══════════════════════════════════════

    const pageInitializers = {
        'dashboard.html': initDashboard,
        'courses.html': initCourses,
        'assignments.html': initAssignments,
        'grades.html': initGrades,
        'modules.html': initModules,
        'calendar.html': initCalendar,
        'announcement.html': initAnnouncements,
        'inbox.html': initInbox,
        'profile.html': initProfile,
        'class.html': initAssignments, // Course home shows assignments
        'classroom.html': initModules, // Classroom shows modules
    };

    // ═══════════════════════════════════════
    // Init
    // ═══════════════════════════════════════

    document.addEventListener('DOMContentLoaded', async () => {
        const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';

        // Skip API init on login page
        if (currentPage === 'login.html') return;

        // Init top bar (all authenticated pages)
        await initTopBar();

        // Init page-specific content
        const init = pageInitializers[currentPage];
        if (init) {
            try {
                await init();
            } catch (e) {
                console.error(`[${currentPage}] Init failed:`, e);
                if (e.isUnauthorized) {
                    window.location.href = 'login.html';
                }
            }
        }
    });

    // ═══════════════════════════════════════
    // Global Error Handler
    // ═══════════════════════════════════════

    window.addEventListener('unhandledrejection', (event) => {
        if (event.reason?.isUnauthorized) {
            window.location.href = 'login.html';
        } else {
            console.error('[Unhandled]', event.reason);
            render.toast('Something went wrong. Please try again.', 'error');
        }
    });

})();
