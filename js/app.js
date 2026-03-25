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
    // Page: Course Home
    // ═══════════════════════════════════════

    async function initCourseHome() {
        const courseId = getCourseId();
        if (!courseId) return;

        try {
            const { data: course } = await api.courses.get(courseId);

            // Update course title
            const titleEl = document.querySelector('.course-title, .banner-title, h3.second-color');
            if (titleEl && course.name) titleEl.textContent = course.name;

            // Update course code
            const codeEl = document.querySelector('.course-code, .banner-subtitle');
            if (codeEl && course.course_code) codeEl.textContent = course.course_code;
        } catch (e) { console.error('[CourseHome] Course:', e); }

        // Load recent announcements
        try {
            const { data: announcements } = await api.announcements.list([`course_${courseId}`]);
            const announceContainer = document.querySelector('.announce-list, .recent-announcements');
            if (announceContainer && announcements) {
                announceContainer.innerHTML = '';
                announcements.slice(0, 3).forEach(a => announceContainer.appendChild(render.announcementRow(a)));
            }
        } catch (e) { console.error('[CourseHome] Announcements:', e); }

        // Load upcoming assignments
        try {
            const { data: assignments } = await api.assignments.list(courseId);
            const upcomingContainer = document.querySelector('.upcoming-assignments, .assign-list');
            if (upcomingContainer && assignments) {
                const upcoming = assignments
                    .filter(a => a.due_at && new Date(a.due_at) > new Date())
                    .sort((a, b) => new Date(a.due_at) - new Date(b.due_at))
                    .slice(0, 5);
                upcomingContainer.innerHTML = '';
                upcoming.forEach(a => upcomingContainer.appendChild(render.assignmentRow(a)));
            }
        } catch (e) { console.error('[CourseHome] Assignments:', e); }
    }

    // ═══════════════════════════════════════
    // Page: Assignment Detail
    // ═══════════════════════════════════════

    async function initAssignmentDetail() {
        const courseId = getCourseId();
        const assignmentId = getParam('assignment_id');
        if (!courseId || !assignmentId) return;

        try {
            const { data: assignment } = await api.assignments.get(courseId, assignmentId);

            // Update title
            const titleEl = document.querySelector('.assignment-title, h4.second-color, h3.second-color');
            if (titleEl) titleEl.textContent = assignment.name;

            // Update description
            const descEl = document.querySelector('.assignment-description, .assign-desc');
            if (descEl) descEl.innerHTML = assignment.description || 'No description provided.';

            // Update points
            const pointsEl = document.querySelector('.assignment-points, .points-badge');
            if (pointsEl) pointsEl.textContent = `${assignment.points_possible || 0} points`;

            // Update due date
            const dueEl = document.querySelector('.assignment-due, .due-date');
            if (dueEl && assignment.due_at) {
                dueEl.textContent = `Due ${render.formatDateTime(assignment.due_at)}`;
            }

            // Update submission status
            if (assignment.submission) {
                const statusEl = document.querySelector('.submission-status');
                if (statusEl) {
                    statusEl.textContent = render.submissionStatus(assignment.submission);
                }
            }

            // Load rubric if present
            if (assignment.rubric) {
                const rubricContainer = document.querySelector('.rubric-container, .rubric-table');
                if (rubricContainer) {
                    rubricContainer.innerHTML = '';
                    const table = render.el('table', 'tw-w-full tw-text-sm');
                    const thead = render.el('thead');
                    const headRow = render.el('tr', 'tw-border-b');
                    headRow.appendChild(render.el('th', 'tw-text-left tw-py-2 tw-text-gray-500', { text: 'Criteria' }));
                    headRow.appendChild(render.el('th', 'tw-text-right tw-py-2 tw-text-gray-500', { text: 'Points' }));
                    thead.appendChild(headRow);
                    table.appendChild(thead);
                    const tbody = render.el('tbody');
                    assignment.rubric.forEach(criterion => {
                        const row = render.el('tr', 'tw-border-b');
                        row.appendChild(render.el('td', 'tw-py-2', { text: criterion.description }));
                        row.appendChild(render.el('td', 'tw-py-2 tw-text-right tw-font-medium', { text: `${criterion.points}` }));
                        tbody.appendChild(row);
                    });
                    table.appendChild(tbody);
                    rubricContainer.appendChild(table);
                }
            }
        } catch (e) {
            console.error('[AssignmentDetail]', e);
        }
    }

    // ═══════════════════════════════════════
    // Page: Submission
    // ═══════════════════════════════════════

    async function initSubmission() {
        const courseId = getCourseId();
        const assignmentId = getParam('assignment_id');
        if (!courseId || !assignmentId) return;

        try {
            const [assignmentRes, submissionRes] = await Promise.all([
                api.assignments.get(courseId, assignmentId),
                api.assignments.submission(courseId, assignmentId),
            ]);

            const assignment = assignmentRes.data;
            const submission = submissionRes.data;

            // Update assignment name
            const titleEl = document.querySelector('.submission-title, h4.second-color');
            if (titleEl) titleEl.textContent = assignment.name;

            // Update grade
            const gradeEl = document.querySelector('.submission-grade, .grade-display');
            if (gradeEl && submission.score !== null) {
                gradeEl.textContent = `${submission.score}/${assignment.points_possible}`;
            }

            // Update status
            const statusEl = document.querySelector('.submission-status');
            if (statusEl) {
                statusEl.textContent = render.submissionStatus(submission);
            }
        } catch (e) {
            console.error('[Submission]', e);
        }
    }

    // ═══════════════════════════════════════
    // Page: Pages Index
    // ═══════════════════════════════════════

    async function initPages() {
        const courseId = getCourseId();
        if (!courseId) return;

        const container = document.querySelector('.pages-container, .pages-list, #assign');
        if (!container) return;

        render.showLoading(container, 'row', 5);

        try {
            const { data: pages } = await api.pages.list(courseId);
            container.innerHTML = '';

            if (!pages || pages.length === 0) {
                container.appendChild(render.emptyState('No pages', 'This course has no pages yet.'));
                return;
            }

            pages.forEach(page => {
                const row = render.el('div', 'tw-flex tw-items-center tw-justify-between tw-p-3 tw-rounded-lg tw-border tw-border-gray-100 tw-mb-2 hover:tw-bg-gray-50 tw-cursor-pointer');
                row.innerHTML = `
                    <div class="tw-flex tw-items-center tw-gap-3">
                        <i class="fa fa-file-alt tw-text-primary-400"></i>
                        <div>
                            <a href="page-view.html?course_id=${courseId}&page_url=${encodeURIComponent(page.url)}" class="tw-text-sm tw-font-medium second-color tw-no-underline hover:tw-text-accent-green">${render.truncate(page.title, 60)}</a>
                            <p class="tw-text-xs tw-text-gray-500">${page.published ? 'Published' : 'Draft'} &bull; Updated ${render.relativeTime(page.updated_at)}</p>
                        </div>
                    </div>
                    ${page.front_page ? '<span class="tw-bg-accent-green/10 tw-text-accent-green tw-text-xs tw-px-2 tw-py-0.5 tw-rounded-full">Front Page</span>' : ''}
                `;
                container.appendChild(row);
            });
        } catch (e) {
            console.error('[Pages]', e);
            container.innerHTML = '';
            container.appendChild(render.emptyState('Error loading pages', e.message));
        }
    }

    // ═══════════════════════════════════════
    // Page: Page View
    // ═══════════════════════════════════════

    async function initPageView() {
        const courseId = getCourseId();
        const pageUrl = getParam('page_url');
        if (!courseId || !pageUrl) return;

        try {
            const { data: page } = await api.pages.get(courseId, pageUrl);

            // Update title
            const titleEl = document.querySelector('.page-title, h4.second-color, h3.second-color');
            if (titleEl) titleEl.textContent = page.title;

            // Update body
            const bodyEl = document.querySelector('.page-body, .page-content, .wiki-content');
            if (bodyEl) bodyEl.innerHTML = page.body || '<p>This page is empty.</p>';

            // Update meta
            const metaEl = document.querySelector('.page-meta, .page-info');
            if (metaEl) {
                metaEl.textContent = `Last updated ${render.relativeTime(page.updated_at)}`;
            }

            // Breadcrumb
            const breadcrumb = document.querySelector('.breadcrumb');
            if (breadcrumb) {
                breadcrumb.innerHTML = `
                    <a href="class.html?course_id=${courseId}">Course</a> &rsaquo;
                    <a href="pages.html?course_id=${courseId}">Pages</a> &rsaquo;
                    <span>${render.truncate(page.title, 40)}</span>
                `;
            }
        } catch (e) {
            console.error('[PageView]', e);
        }
    }

    // ═══════════════════════════════════════
    // Page: Files
    // ═══════════════════════════════════════

    async function initFiles() {
        const courseId = getCourseId();
        if (!courseId) return;

        const container = document.querySelector('.files-container, .file-list, #assign');
        if (!container) return;

        render.showLoading(container, 'row', 5);

        try {
            // Get root folder first
            const { data: rootFolder } = await api.files.rootFolder(courseId);

            // Load files and subfolders in parallel
            const [filesRes, foldersRes, quotaRes] = await Promise.all([
                api.files.listInFolder(courseId, rootFolder.id),
                api.files.listFolders(courseId, rootFolder.id),
                api.files.quota(courseId),
            ]);

            container.innerHTML = '';

            // Render folders
            (foldersRes.data || []).forEach(folder => {
                const row = render.el('div', 'tw-flex tw-items-center tw-justify-between tw-p-3 tw-rounded-lg tw-border tw-border-gray-100 tw-mb-2 hover:tw-bg-gray-50 tw-cursor-pointer');
                row.innerHTML = `
                    <div class="tw-flex tw-items-center tw-gap-3">
                        <i class="fa fa-folder tw-text-accent-orange"></i>
                        <div>
                            <p class="tw-text-sm tw-font-medium second-color">${folder.name}</p>
                            <p class="tw-text-xs tw-text-gray-500">${folder.files_count || 0} files</p>
                        </div>
                    </div>
                    <i class="fa fa-chevron-right tw-text-gray-300"></i>
                `;
                container.appendChild(row);
            });

            // Render files
            (filesRes.data || []).forEach(file => {
                const icon = file.content_type?.includes('pdf') ? 'fa-file-pdf tw-text-red-500' :
                             file.content_type?.includes('image') ? 'fa-file-image tw-text-blue-500' :
                             file.content_type?.includes('video') ? 'fa-file-video tw-text-purple-500' :
                             file.content_type?.includes('word') ? 'fa-file-word tw-text-blue-600' :
                             'fa-file tw-text-gray-400';
                const size = file.size > 1048576 ? `${(file.size / 1048576).toFixed(1)} MB` : `${(file.size / 1024).toFixed(0)} KB`;

                const row = render.el('div', 'tw-flex tw-items-center tw-justify-between tw-p-3 tw-rounded-lg tw-border tw-border-gray-100 tw-mb-2 hover:tw-bg-gray-50');
                row.innerHTML = `
                    <div class="tw-flex tw-items-center tw-gap-3">
                        <i class="fa ${icon}"></i>
                        <div>
                            <p class="tw-text-sm tw-font-medium second-color">${file.display_name}</p>
                            <p class="tw-text-xs tw-text-gray-500">${size} &bull; ${render.relativeTime(file.updated_at)}</p>
                        </div>
                    </div>
                    <a href="${file.url}" target="_blank" class="tw-text-gray-400 hover:tw-text-accent-green"><i class="fa fa-download"></i></a>
                `;
                container.appendChild(row);
            });

            // Storage quota
            const quotaEl = document.querySelector('.storage-quota, .quota-bar');
            if (quotaEl && quotaRes.data) {
                const used = quotaRes.data.quota_used || 0;
                const total = quotaRes.data.quota || 1;
                const pct = Math.round((used / total) * 100);
                const usedMB = (used / 1048576).toFixed(1);
                const totalMB = (total / 1048576).toFixed(0);
                quotaEl.innerHTML = `
                    <p class="tw-text-xs tw-text-gray-500 tw-mb-1">Storage: ${usedMB} MB / ${totalMB} MB (${pct}%)</p>
                    <div class="tw-w-full tw-bg-gray-100 tw-rounded-full tw-h-2">
                        <div class="tw-bg-accent-green tw-h-2 tw-rounded-full" style="width:${pct}%"></div>
                    </div>
                `;
            }

            if ((filesRes.data || []).length === 0 && (foldersRes.data || []).length === 0) {
                container.appendChild(render.emptyState('No files', 'This course has no files yet.'));
            }
        } catch (e) {
            console.error('[Files]', e);
            container.innerHTML = '';
            container.appendChild(render.emptyState('Error loading files', e.message));
        }
    }

    // ═══════════════════════════════════════
    // Page: Syllabus
    // ═══════════════════════════════════════

    async function initSyllabus() {
        const courseId = getCourseId();
        if (!courseId) return;

        try {
            const { data: course } = await api.courses.get(courseId);

            // Update syllabus body
            const bodyEl = document.querySelector('.syllabus-body, .syllabus-content, .page-content');
            if (bodyEl && course.syllabus_body) {
                bodyEl.innerHTML = course.syllabus_body;
            }

            // Load assignments for the syllabus schedule
            const { data: assignments } = await api.assignments.list(courseId, { order_by: 'due_at' });
            const scheduleContainer = document.querySelector('.syllabus-schedule, .assignment-schedule');
            if (scheduleContainer && assignments) {
                scheduleContainer.innerHTML = '';
                assignments
                    .filter(a => a.due_at)
                    .sort((a, b) => new Date(a.due_at) - new Date(b.due_at))
                    .forEach(a => {
                        const row = render.el('div', 'tw-flex tw-items-center tw-justify-between tw-p-2 tw-border-b tw-border-gray-100');
                        row.innerHTML = `
                            <div>
                                <p class="tw-text-sm second-color">${a.name}</p>
                                <p class="tw-text-xs tw-text-gray-500">${render.formatDate(a.due_at)}</p>
                            </div>
                            <span class="tw-text-xs tw-text-gray-400">${a.points_possible || 0} pts</span>
                        `;
                        scheduleContainer.appendChild(row);
                    });
            }
        } catch (e) {
            console.error('[Syllabus]', e);
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
        'announcements-list.html': initAnnouncements,
        'inbox.html': initInbox,
        'profile.html': initProfile,
        'class.html': initCourseHome,
        'course-home.html': initCourseHome,
        'classroom.html': initModules,
        'assignment-detail.html': initAssignmentDetail,
        'submission.html': initSubmission,
        'pages.html': initPages,
        'page-view.html': initPageView,
        'files.html': initFiles,
        'syllabus.html': initSyllabus,
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
