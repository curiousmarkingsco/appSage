waitForGlobalsLoaded().then(() => {
    const quickNotesHtmlTemplate = `
        <div class="quickNotes-container bg-slate-100 dark:bg-slate-800" data-component-name="quickNotes" data-component-id="{{quickNotes.id}}">
            <div class="container mx-auto p-4">

                <!-- Top Navigation Bar: Note Creation, Search, and Label Filtering -->
                <header class="flex flex-col md:flex-row items-center justify-between rounded-lg p-4 bg-white dark:bg-slate-900 dark:text-white shadow">
                    <!-- Note Creation Pillbox -->
                    <div id="quicknote-note-creation-pillbox" class="flex items-center space-x-2">
                        <div class="group/qNoteNewBtn flex relative">
                            <button id="quicknote-create-checkbox-note"
                                class="absolute group-hover/qNoteNewBtn:pl-6 group-hover/qNoteNewBtn:pr-3 flex items-center ml-0 left-5 py-2 rounded-r-full bg-sky-500 text-white overflow-hidden w-0 group-hover/qNoteNewBtn:w-[7rem] duration-300 ease-in-out transition-all hover:bg-sky-600">
                                Checklist
                            </button>
                            <button id="quicknote-create-text-note" class="flex items-center p-2 rounded-full bg-sky-600 text-white rounded-lg-full relative z-5">
                                <svg fill="currentColor" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Pro 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc.--><path d="M256 80l0-32-64 0 0 32 0 144L48 224l-32 0 0 64 32 0 144 0 0 144 0 32 64 0 0-32 0-144 144 0 32 0 0-64-32 0-144 0 0-144z"/></svg>
                            </button>
                        </div>
                    </div>
                    <!-- Search and Criteria -->
                    <div class="flex items-center space-x-2 mt-4 md:mt-0">
                        <input id="quicknote-search-input" type="text" placeholder="Search notes..." class="px-3 py-1 border rounded-lg" />
                        <div class="relative">
                            <button id="quicknote-search-criteria-btn" class="px-3 py-1 border rounded-lg">Search by</button>
                            <div id="quicknote-search-criteria-dropdown"
                                class="absolute right-0 mt-1 w-48 bg-white dark:bg-black dark:text-white border rounded-lg shadow hidden">
                                <div class="px-3 py-1">
                                    <label class="flex items-center">
                                        <input type="checkbox" class="mr-2" checked data-criteria="title" /> Title
                                    </label>
                                    <label class="flex items-center">
                                        <input type="checkbox" class="mr-2" checked data-criteria="checklist" /> Checklist Items
                                    </label>
                                    <label class="flex items-center">
                                        <input type="checkbox" class="mr-2" checked data-criteria="text" /> Text
                                    </label>
                                    <label class="flex items-center">
                                        <input type="checkbox" class="mr-2" data-criteria="labels" /> Labels
                                    </label>
                                </div>
                            </div>
                        </div>
                        <!-- Label Filter Dropdown -->
                        <div class="relative">
                            <button id="quicknote-label-filter-btn" class="px-3 py-1 border rounded-lg">Filter by Label</button>
                            <div id="quicknote-label-filter-dropdown"
                                class="absolute right-0 mt-1 w-48 bg-white dark:bg-black dark:text-slate-200 border rounded-lg shadow hidden max-h-60 overflow-y-auto">
                                <input id="quicknote-label-filter-search" type="text" placeholder="Search labels..."
                                    class="w-full px-2 py-1 border-b" />
                                <div id="quicknote-label-filter-list">
                                    <!-- Labels will be dynamically populated here -->
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <!-- Main Layout Container for Notes -->
                <main id="quicknote-notes-container" class="p-4">
                    <!-- Pinned Notes Section -->
                    <section id="quicknote-pinned-notes">
                        <h2 class="text-xl font-semibold mb-2 dark:text-slate-100 sr-only">Pinned</h2>
                        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 notes-grid">
                            <!-- Pinned note cards are injected here -->
                        </div>
                    </section>

                    <!-- Active (Unpinned/Unarchived) Notes Section -->
                    <section id="quicknote-active-notes" class="mt-6">
                        <h2 class="text-xl font-semibold mb-2 dark:text-slate-100 sr-only">Notes</h2>
                        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 notes-grid">
                            <!-- Active note cards are injected here -->
                        </div>
                    </section>

                    <!-- Archived Notes Section -->
                    <section id="quicknote-archived-notes" class="mt-6">
                        <h2 class="text-base font-semibold mb-2 text-slate-400 dark:text-slate-100 border-b border-slate-200">Archived</h2>
                        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 notes-grid">
                            <!-- Archived note cards are injected here -->
                        </div>
                    </section>
                </main>

                <!-- Note Editor Modal -->
                <div id="quicknote-note-editor-modal" class="fixed inset-0 flex items-center justify-center hidden">
                    <div id="quicknote-bg-close-editor" class="fixed inset-0 flex h-full w-full bg-black bg-opacity-50 dark:bg-opacity-30"></div>
                    <!-- Note Editor Container -->
                    <div id="quicknote-note-editor" class="w-1/3 min-h-96 grid grid-cols-1 content-start bg-white dark:bg-black rounded-lg shadow dark:border dark:border-slate-500 dark:shadow-white dark:text-white p-4 relative">
                        <!-- Title Input -->
                        <input id="quicknote-note-title" type="text" placeholder="Title"
                            class="w-full border-b border-slate-300 dark:border-slate-700 focus:outline-none text-lg font-bold mb-2 bg-transparent" />
            
                        <!-- Media Gallery (for images and audio) -->
                        <div id="quicknote-media-gallery" class="flex gap-2 mb-2"></div>
            
                        <!-- Content Textarea (Text mode) -->
                        <textarea id="quicknote-note-content" placeholder="Take a note..."
                            class="min-h-64 border border-slate-300 dark:border-slate-700 rounded-lg p-2 mb-2 bg-transparent"></textarea>
            
                        <!-- Checkbox Mode Container (hidden by default) -->
                        <div id="quicknote-checkbox-container" class="hidden min-h-64 mb-2">
                            <ul id="quicknote-checkbox-list"></ul>
                        </div>
            
                        <!-- Label Pills Container -->
                        <div id="quicknote-label-pills" class="flex flex-wrap gap-1 mb-2"></div>
            
                        <!-- Bottom Menu Icons -->
                        <div class="flex justify-between border-t dark:border-slate-500 pt-2">
                            <!-- Image Icon -->
                            <button id="quicknote-add-image" class="text-slate-500 hover:text-sky-500">
                                <svg fill="currentColor" class="h-7 w-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><!--!Font Awesome Pro 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc.--><path d="M576 32L96 32l0 352 480 0 0-352zM395.6 139.8l96 136L496 282l0 7.6 0 8 0 24-24 0-120 0-24 0-48 0-24 0-56 0-24 0 0-24 0-8 0-9.1 6.1-6.8 64-72L264 181.5l17.9 20.2L299.1 221l57.3-81.2L376 112l19.6 27.8zM192 128a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zM48 120l0-24L0 96l0 24L0 456l0 24 24 0 432 0 24 0 0-48-24 0L48 432l0-312z"/></svg>
                            </button>
                            <!-- Audio Icon -->
                            <button id="quicknote-add-audio" class="text-slate-500 hover:text-sky-500">
                                <svg fill="currentColor" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Pro 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc.--><path d="M96 0l0 256c0 53 43 96 96 96s96-43 96-96l-80 0-16 0 0-32 16 0 80 0 0-32-80 0-16 0 0-32 16 0 80 0 0-32-80 0-16 0 0-32 16 0 80 0 0-96L96 0zM320 224l0 32c0 70.7-57.3 128-128 128s-128-57.3-128-128l0-40 0-24-48 0 0 24 0 40c0 89.1 66.2 162.7 152 174.4l0 33.6-48 0-24 0 0 48 24 0 72 0 72 0 24 0 0-48-24 0-48 0 0-33.6c85.8-11.7 152-85.3 152-174.4l0-40 0-24-48 0 0 24 0 8z"/></svg>
                            </button>
                            <!-- Label Icon -->
                            <button id="quicknote-manage-labels" class="text-slate-500 hover:text-sky-500">
                                <svg fill="currentColor" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Pro 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc.--><path d="M495.2 189.3l7 7 0 9.9 0 99.5 0 9.9-7 7L337 481 303 447 454.2 295.8l0-79.6L303 65 337 31 495.2 189.3zM0 256L0 32l224 0L416 224l0 64L224 480 0 256zM144 144a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
                            </button>
                            <!-- Color Palette Icon -->
                            <button id="quicknote-choose-color" class="text-slate-500 hover:text-sky-500">
                                <svg fill="currentColor" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Pro 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc.--><path d="M256 0C397.4 0 512 114.6 512 256l0 64-156.1 0c-37.5 0-67.9 30.4-67.9 67.9c0 18 7.2 35.3 19.9 48L320 448l-64 64C114.6 512 0 397.4 0 256S114.6 0 256 0zm0 128a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm-96 32a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM416 160a32 32 0 1 0 -64 0 32 32 0 1 0 64 0z"/></svg>
                            </button>
                            <!-- Archive Icon -->
                            <button id="quicknote-toggle-archive" class="text-slate-500 hover:text-sky-500">
                                <svg fill="currentColor" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Pro 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc.--><path d="M512 32l0 96L0 128 0 32l512 0zM32 160l448 0 0 320L32 480l0-320zm128 64l0 32 16 0 160 0 16 0 0-32-16 0-160 0-16 0z"/></svg>
                            </button>
                            <!-- Ellipsis Icon (Dropdown for Pin & Delete) -->
                            <div class="relative">
                                <button id="quicknote-ellipsis-menu" class="text-slate-500 mt-2 dark:text-slate-100 hover:text-sky-500">
                                    <svg fill="currentColor" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Pro 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc.--><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm32-320l-64 0 0-64 64 0 0 64zm0 192l-64 0 0-64 64 0 0 64zm0-160l0 64-64 0 0-64 64 0z"/></svg>
                                </button>
                                <!-- Dropdown Menu (hidden by default) -->
                                <div id="quicknote-dropdown-menu" class="absolute text-slate-700 right-0 mt-2 w-32 bg-white dark:bg-black dark:text-white border dark:border-slate-700 overflow-hidden rounded-lg shadow hidden">
                                    <!-- Toggle Button to Switch Modes -->
                                    <button id="quicknote-toggle-mode" class="block w-full text-left px-4 py-2 dark:hover:bg-slate-800 hover:bg-slate-100">Switch to Checklist</button>
                                    <button id="quicknote-pin-note" class="block w-full text-left px-4 py-2 dark:hover:bg-slate-800 hover:bg-slate-100">Pin Note</button>
                                    <button id="quicknote-delete-note" class="block w-full text-left px-4 py-2 dark:hover:bg-slate-800 hover:bg-slate-100">Delete Note</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Modal for Image Upload -->
                <div id="quicknote-modal-image" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-30 hidden">
                    <div class="bg-white dark:bg-black dark:text-white rounded-lg p-4 w-80 dark:border dark:border-slate-500">
                        <h2 class="text-lg mb-2">Add Image</h2>
                        <input id="quicknote-image-url" type="text" placeholder="Image URL" class="w-full border rounded-lg p-2 mb-2" />
                        <input id="quicknote-image-file" type="file" accept="image/*" class="w-full mb-2" />
                        <div class="flex justify-end">
                            <button id="quicknote-close-modal-image" class="text-slate-500 hover:text-sky-500 mr-2">Cancel</button>
                            <button id="quicknote-save-image" class="text-sky-500">Save</button>
                        </div>
                    </div>
                </div>

                <!-- Modal for Audio Upload -->
                <div id="quicknote-modal-audio" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-30 hidden">
                    <div class="bg-white dark:bg-black dark:text-white rounded-lg p-4 w-80 dark:border dark:border-slate-500">
                        <h2 class="text-lg mb-2">Add Audio</h2>
                        <input id="quicknote-audio-url" type="text" placeholder="Audio URL" class="w-full border rounded-lg p-2 mb-2" />
                        <input id="quicknote-audio-file" type="file" accept="audio/*" class="w-full mb-2" />
                        <div class="flex justify-end">
                            <button id="quicknote-close-modal-audio" class="text-slate-500 hover:text-sky-500 mr-2">Cancel</button>
                            <button id="quicknote-save-audio" class="text-sky-500">Save</button>
                        </div>
                    </div>
                </div>

                <!-- Modal for Label Management -->
                <div id="quicknote-modal-labels" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-30 hidden">
                    <div class="bg-white dark:bg-black dark:text-white rounded-lg p-4 w-80 dark:border dark:border-slate-500">
                        <h2 class="text-lg mb-2">Manage Labels</h2>
                        <!-- Optional search input (toggle via JS if needed) -->
                        <input id="quicknote-label-search" type="text" placeholder="Search Labels"
                            class="w-full border rounded-lg p-2 mb-2 hidden" />
                        <!-- List of labels -->
                        <div id="quicknote-label-list" class="max-h-40 overflow-y-auto mb-2">
                            <!-- Dynamically generated label list will be inserted here -->
                        </div>
                        <input id="quicknote-new-label" type="text" placeholder="Create new label"
                            class="w-full border rounded-lg p-2 mb-2" />
                        <div class="flex justify-end">
                            <button id="quicknote-close-modal-labels" class="text-slate-500 hover:text-sky-500 mr-2">Cancel</button>
                            <button id="quicknote-save-labels" class="text-sky-500">Save</button>
                        </div>
                    </div>
                </div>

                <!-- Modal for Color Customization -->
                <div id="quicknote-modal-color" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-30 hidden">
                    <div class="bg-white dark:bg-black dark:text-white rounded-lg p-4 w-80 dark:border dark:border-slate-500">
                        <h2 class="text-lg mb-2">Choose Colors</h2>
                        <div class="mb-2">
                            <label class="block mb-1">Background Color</label>
                            <input id="quicknote-bg-color" type="color" class="w-full" />
                        </div>
                        <div class="mb-2">
                            <label class="block mb-1">Text Color</label>
                            <input id="quicknote-text-color" type="color" class="w-full" />
                        </div>
                        <div class="flex justify-end">
                            <button id="quicknote-close-modal-color" class="text-slate-500 hover:text-sky-500 mr-2">Cancel</button>
                            <button id="quicknote-save-color" class="text-sky-500">Save</button>
                        </div>
                    </div>
                </div>

                <!-- Modal for Delete Confirmation -->
                <div id="quicknote-modal-delete" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-30 hidden">
                    <div class="bg-white dark:bg-black dark:text-white rounded-lg p-4 w-80 dark:border dark:border-slate-500">
                        <h2 class="text-lg mb-2">Delete Note</h2>
                        <p class="mb-4">Are you sure you want to permanently delete this note?</p>
                        <div class="flex justify-end">
                            <button id="quicknote-cancel-delete" class="text-slate-500 hover:text-sky-500 mr-2">Cancel</button>
                            <button id="quicknote-confirm-delete" class="text-rose-500">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    appSageComponents['quickNotes'].html_template = quickNotesHtmlTemplate;

    const quickNotesFormTemplate = `
        <div class="quickNotes-form"></div>
    `;
    appSageComponents['quickNotes'].form_template = quickNotesFormTemplate;
});

function initializeNoteDataFromForm(container) {
    const sidebar = document.getElementById('sidebar');
    const form = sidebar.querySelector('.quickNotes-form');
}
window.initializeNoteDataFromForm = initializeNoteDataFromForm;

function initializeQuickNotes(container) {
    // -------------------------
    // GLOBAL STATE & SELECTORS
    // -------------------------
    let currentNoteId = null;             // Current note being edited (null = new note)
    let currentNoteMode = 'text';         // 'text' or 'checkbox'
    let currentNoteLabels = [];           // Labels attached to current note
    let currentMedia = { images: [], audio: [] };
    let isChecklist = false;
    let isPinned = false;

    const noteEditorModal = document.getElementById('quicknote-note-editor-modal'); // The modal wrapper for the editor
    const noteEditor = document.getElementById('quicknote-note-editor');            // The actual note editor snippet within the modal
    const checkboxList = document.getElementById('quicknote-checkbox-list');

    // -------------------------
    // RENDER NOTES FUNCTION
    // -------------------------
    // This function reads from localStorage and creates note cards
    function renderNotes() {
        const currentPage = getCurrentPage();
        const retrievedData = currentPage.quickNotes;

        const storedNotes = retrievedData ? JSON.parse(retrievedData).notes : [];
        // Alternate storage of notes via GET
        // fetch('https://example.com/endpoint/quicknotes', {
        //   headers: { 'Content-Type': 'application/json' }
        // })
        //   .then(response => console.log('Note saved:', response))
        //   .catch(error => console.error('Error saving note:', error));

        // Assume these containers exist in your HTML:
        const pinnedContainer = document.querySelector('#quicknote-pinned-notes .notes-grid');
        const activeContainer = document.querySelector('#quicknote-active-notes .notes-grid');
        const archivedContainer = document.querySelector('#quicknote-archived-notes .notes-grid');

        if (pinnedContainer) pinnedContainer.innerHTML = '';
        if (activeContainer) activeContainer.innerHTML = '';
        if (archivedContainer) archivedContainer.innerHTML = '';

        storedNotes.forEach(note => {
            const card = document.createElement('div');
            card.className = 'note-card border rounded p-2 shadow relative cursor-pointer dark:text-slate-50 dark:shadow-white dark:bg-slate-800';
            card.dataset.noteId = note.id;
            card.dataset.type = note.type;
            card.dataset.title = note.title || '';
            card.dataset.text = note.content || '';
            card.dataset.checklist = (note.checkboxItems || []).map(item => item.text).join('\n');
            card.dataset.labels = (note.labels || []).join(',');

            if (note.bgColor) card.style.backgroundColor = note.bgColor;
            if (note.textColor) card.style.color = note.textColor;

            // Create a title element
            const titleEl = document.createElement('h3');
            titleEl.textContent = note.title || 'Untitled';
            card.appendChild(titleEl);

            // Media preview: if an image exists, show the first one
            if (note.media && note.media.images && note.media.images.length > 0) {
                const img = document.createElement('img');
                img.src = note.media.images[0].data;
                img.className = 'w-full h-24 object-cover rounded mt-2';
                card.appendChild(img);
            }

            // Content preview (for checklist, render a simple list; for text, a paragraph)
            if (note.type === 'checkbox') {
                const ul = document.createElement('ul');
                (note.checkboxItems || []).forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item.text;
                    ul.appendChild(li);
                });
                card.appendChild(ul);
            } else {
                const p = document.createElement('p');
                p.textContent = note.content || '';
                card.appendChild(p);
            }

            // Add the pin icon
            const pinIcon = document.createElement('span');
            if (note.pinned) {
                pinIcon.innerHTML = `<span class="text-slate-400 group/qNotePin${note.id}"><span class="group-hover/qNotePin${note.id}:hidden"><svg fill="currentColor" class="h-5 w-5 p-[0.1rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Pro 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc.--><path d="M64 0L32 0l0 64 32 0 29.5 0L82.1 212.1C23.7 240.7 0 293 0 320l0 32 384 0 0-32c0-22.5-23.7-76.5-82.1-106.7L290.5 64 320 64l32 0 0-64L320 0 64 0zm96 480l0 32 64 0 0-32 0-96-64 0 0 96z"/></svg></span><span class="hidden group-hover/qNotePin${note.id}:block"><svg fill="currentColor" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Pro 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc.--><path d="M482.7 352l29.3 0 0-32c0-22.5-23.7-76.5-82.1-106.7L418.5 64 448 64l32 0 0-64L448 0 192 0 160 0l0 64 32 0 29.5 0-6.2 80.4L48.4 14.8 29.4 .1 0 38 19 52.7 591.5 497.2l19 14.7L639.9 474l-19-14.7L482.7 352zm-157.8 0L175.8 234.5C142.2 263 128 299.1 128 320l0 32 196.9 0zM288 480l0 32 64 0 0-32 0-96-64 0 0 96z"/></svg></span></span>`;
            } else {
                pinIcon.innerHTML = '<span class="text-slate-400"><svg fill="currentColor" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Pro 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc.--><path d="M264.6 218.2l17.9 13c18.8 13.8 32.7 32.1 41.9 49.6c5.1 9.7 8 17.7 9.7 23.2L216 304l0-88 0-24-48 0 0 24 0 88L49.4 304c.2-1 .5-2.1 .9-3.2c1.9-6.5 4.9-14.4 9.4-22.9c9-17 22.6-34.5 41.2-47.6l18.6-13 1.7-22.6L132.4 48l119.1 0 11.4 148.2 1.7 22zM216 352l120 0 48 0 0-40c0-2.3-.2-4.9-.7-8c-4.1-25.8-26-77.6-72.5-111.5L299.7 48 328 48l24 0 0-48L328 0 296 0 88 0 56 0 32 0l0 48 24 0 28.3 0-11 143C26.1 224.1 4.2 275.6 .6 304c-.4 2.9-.6 5.6-.6 8l0 40 48 0 120 0 0 136 0 24 48 0 0-24 0-136z"/></svg>';
            }
            pinIcon.className = 'absolute top-2 right-2';
            card.appendChild(pinIcon);

            // If archived, add a visual indicator (here, reduced opacity)
            if (note.archived) {
                card.classList.add('opacity-50');
            }

            // Open the editor modal when clicking a note card
            card.addEventListener('click', () => {
                openNoteEditor(note.id, note.type);
            });

            // Append the card to its category container
            if (note.archived && archivedContainer) {
                archivedContainer.appendChild(card);
            } else if (note.pinned && pinnedContainer) {
                pinnedContainer.appendChild(card);
            } else if (activeContainer) {
                activeContainer.appendChild(card);
            }
        });
    }

    // -------------------------
    // NOTE EDITOR FUNCTIONS
    // -------------------------
    function openNoteEditor(noteId, mode) {
        if (noteId) {
            currentNoteId = noteId;
            const currentPage = getCurrentPage();
            const retrievedData = currentPage.quickNotes;
            const storedNotes = retrievedData ? JSON.parse(retrievedData).notes : [];
            const note = storedNotes.find(n => n.id === noteId);
            if (note) {
                document.getElementById('quicknote-note-title').value = note.title || '';
                if (mode === 'text') {
                    document.getElementById('quicknote-note-content').value = note.content || '';
                    document.getElementById('quicknote-note-content').classList.remove('hidden');
                    document.getElementById('quicknote-checkbox-container').classList.add('hidden');
                } else if (mode === 'checkbox') {
                    checkboxList.innerHTML = '';
                    (note.checkboxItems || []).forEach(item => createCheckboxItem(item.text));
                    if (!checkboxList.lastElementChild ||
                        checkboxList.lastElementChild.querySelector('input[type="text"]').value !== '') {
                        createCheckboxItem('');
                    }
                    document.getElementById('quicknote-note-content').classList.add('hidden');
                    document.getElementById('quicknote-checkbox-container').classList.remove('hidden');
                }
                currentMedia = note.media || { images: [], audio: [] };
                currentNoteLabels = note.labels || [];
                isPinned = note.pinned || false;
                updateLabelPills();
            }
        } else {
            // New note: reset all fields
            currentNoteId = null;
            document.getElementById('quicknote-note-title').value = '';
            document.getElementById('quicknote-note-content').value = '';
            document.getElementById('quicknote-note-content').classList.remove('hidden');
            document.getElementById('quicknote-checkbox-container').classList.add('hidden');
            checkboxList.innerHTML = '';
            currentMedia = { images: [], audio: [] };
            currentNoteLabels = [];
            isChecklist = (mode === 'checkbox');
            isPinned = false;
            updateLabelPills();
        }
        noteEditorModal.classList.remove('hidden');
        noteEditorModal.querySelector('#quicknote-bg-close-editor').addEventListener('click', () => {
            closeNoteEditor();
        });
        if (mode === 'text') {
            document.getElementById('quicknote-note-content').focus();
        } else if (mode === 'checkbox') {
            let firstInput = document.querySelector('#quicknote-checkbox-list input[type="text"]');
            if (!firstInput) {
                firstInput = createCheckboxItem('');
                firstInput = document.querySelector('#quicknote-checkbox-list input[type="text"]');
            }
            document.getElementById('quicknote-note-content').classList.add('hidden')
            document.getElementById('quicknote-checkbox-container').classList.remove('hidden')
            if (firstInput) firstInput.focus();
        }
    }

    // -------------------------
    // SAVE / UPDATE NOTE
    // -------------------------
    function saveNote() {
        const note = {
            id: null,
            type: isChecklist ? 'checkbox' : 'text',
            title: document.getElementById('quicknote-note-title').value,
            content: isChecklist
                ? Array.from(checkboxList.querySelectorAll('li'))
                    .map(li => li.querySelector('input[type="text"]').value)
                    .join('\n')
                : document.getElementById('quicknote-note-content').value,
            checkboxItems: isChecklist
                ? Array.from(checkboxList.querySelectorAll('li')).map(li => ({
                    id: li.dataset.itemId || Date.now().toString() + Math.random().toString(16),
                    text: li.querySelector('input[type="text"]').value,
                    checked: li.querySelector('input[type="checkbox"]').checked
                }))
                : [],
            media: currentMedia,
            labels: currentNoteLabels,
            pinned: isPinned,
            archived: document.getElementById('quicknote-toggle-archive').classList.contains('archived') || false
        };

        const currentPage = getCurrentPage();
        const retrievedData = currentPage.quickNotes;
        let storedNotes = retrievedData ? JSON.parse(retrievedData).notes : [];
        if (!currentNoteId) {
            note.id = Date.now().toString() + Math.random().toString(16);
            currentNoteId = note.id;
            storedNotes.push(note);
        } else {
            note.id = currentNoteId;
            const idx = storedNotes.findIndex(n => n.id === currentNoteId);
            if (idx !== -1) {
                storedNotes[idx] = note;
            } else {
                storedNotes.push(note);
            }
        }
        const parsedData = retrievedData ? JSON.parse(retrievedData) : {};
        parsedData.notes = storedNotes;
        const json = JSON.stringify(parsedData);
        saveComponentObjectToPage('quickNotes', json);

        // old:
        // localStorage.setItem('quickNote.notes', JSON.stringify(storedNotes));

        // Simulate API call to save note
        // fetch('https://example.com/endpoint/quicknote', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(note)
        // })
        //   .then(response => console.log('Note saved:', response))
        //   .catch(error => console.error('Error saving note:', error));

        renderNotes();
    }

    function closeNoteEditor() {
        noteEditorModal.classList.add('hidden');
        saveNote();
    }

    // -------------------------
    // CHECKLIST ITEM CREATION
    // -------------------------
    function createCheckboxItem(text) {
        const li = document.createElement('li');
        li.className = 'flex items-center mb-1 group';
        li.dataset.itemId = Date.now().toString() + Math.random().toString(16);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'mr-2';
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                input.classList.add('line-through');
            } else {
                input.classList.remove('line-through');
            }
            saveNote();
        });

        const input = document.createElement('input');
        input.type = 'text';
        input.value = text;
        input.className = 'flex-grow border-b border-slate-300 p-1 bg-transparent focus:outline-none';
        input.addEventListener('input', () => {
            if (li === checkboxList.lastElementChild && input.value !== '') {
                createCheckboxItem('');
            }
            saveNote();
        });
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const newItem = createCheckboxItem('');
                li.parentNode.insertBefore(newItem, li.nextSibling);
                newItem.querySelector('input[type="text"]').focus();
                saveNote();
            }
            if (e.key === 'Backspace' && input.value === '') {
                if (li !== checkboxList.lastElementChild) {
                    e.preventDefault();
                    const prev = li.previousElementSibling;
                    li.remove();
                    if (prev) {
                        const prevInput = prev.querySelector('input[type="text"]');
                        prevInput.focus();
                        prevInput.setSelectionRange(prevInput.value.length, prevInput.value.length);
                    }
                    saveNote();
                }
            }
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'x';
        deleteBtn.className = 'text-rose-500 ml-2 hidden';
        deleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            li.remove();
            saveNote();
        });

        li.addEventListener('mouseenter', () => { deleteBtn.classList.remove('hidden'); });
        li.addEventListener('mouseleave', () => { if (document.activeElement !== input) deleteBtn.classList.add('hidden'); });
        input.addEventListener('focus', () => { deleteBtn.classList.remove('hidden'); });
        input.addEventListener('blur', () => { setTimeout(() => { if (!li.matches(':hover')) deleteBtn.classList.add('hidden'); }, 100); });

        li.appendChild(checkbox);
        li.appendChild(input);
        li.appendChild(deleteBtn);
        checkboxList.appendChild(li);
        return li;
    }

    // -------------------------
    // MEDIA MODAL ACTIONS (IMAGES / AUDIO)
    // -------------------------
    function toggleModal(modalId, show) {
        const modal = document.getElementById(modalId);
        show ? modal.classList.remove('hidden') : modal.classList.add('hidden');
    }
    const addImg = document.getElementById('quicknote-add-image');
    if (addImg) addImg.addEventListener('click', () => { toggleModal('modal-image', true); });
    document.getElementById('quicknote-close-modal-image').addEventListener('click', () => { toggleModal('modal-image', false); });
    document.getElementById('quicknote-save-image').addEventListener('click', () => {
        const imageUrlInput = document.getElementById('quicknote-image-url');
        const imageFileInput = document.getElementById('quicknote-image-file');
        let imageData = null;
        if (imageUrlInput.value.trim() !== '') {
            imageData = imageUrlInput.value.trim();
            addImage(imageData, 'url');
            imageUrlInput.value = '';
            toggleModal('modal-image', false);
            saveNote();
        } else if (imageFileInput.files && imageFileInput.files[0]) {
            const file = imageFileInput.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                imageData = e.target.result;
                addImage(imageData, 'blob');
                imageFileInput.value = '';
                toggleModal('modal-image', false);
                saveNote();
            };
            reader.readAsDataURL(file);
        } else {
            toggleModal('modal-image', false);
        }
    });

    function addImage(src, type) {
        const id = Date.now().toString();
        currentMedia.images.push({ id, type, data: src });
        appendImageToGallery(src, id);
    }

    function appendImageToGallery(src, id) {
        const gallery = document.getElementById('quicknote-media-gallery');
        const container = document.createElement('div');
        container.className = 'relative';
        container.dataset.mediaId = id;

        const img = document.createElement('img');
        img.src = src;
        img.className = 'w-16 h-16 object-cover rounded';

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'x';
        deleteBtn.className = 'absolute top-0 right-0 text-rose-500 hidden';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentMedia.images = currentMedia.images.filter(item => item.id !== id);
            container.remove();
            saveNote();
        });

        container.addEventListener('mouseenter', () => { deleteBtn.classList.remove('hidden'); });
        container.addEventListener('mouseleave', () => { deleteBtn.classList.add('hidden'); });

        container.appendChild(img);
        container.appendChild(deleteBtn);
        gallery.appendChild(container);
    }

    const addAud = document.getElementById('quicknote-add-audio');
    if (addAud) addAud.addEventListener('click', () => { toggleModal('modal-audio', true); });
    document.getElementById('quicknote-close-modal-audio').addEventListener('click', () => { toggleModal('modal-audio', false); });
    document.getElementById('quicknote-save-audio').addEventListener('click', () => {
        const audioUrlInput = document.getElementById('quicknote-audio-url');
        const audioFileInput = document.getElementById('quicknote-audio-file');
        let audioData = null;
        if (audioUrlInput.value.trim() !== '') {
            audioData = audioUrlInput.value.trim();
            addAudio(audioData, 'url');
            audioUrlInput.value = '';
            toggleModal('modal-audio', false);
            saveNote();
        } else if (audioFileInput.files && audioFileInput.files[0]) {
            const file = audioFileInput.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                audioData = e.target.result;
                addAudio(audioData, 'blob');
                audioFileInput.value = '';
                toggleModal('modal-audio', false);
                saveNote();
            };
            reader.readAsDataURL(file);
        } else {
            toggleModal('modal-audio', false);
        }
    });

    function addAudio(src, type) {
        const id = Date.now().toString();
        currentMedia.audio.push({ id, type, data: src });
        appendAudioToGallery(src, id);
    }

    function appendAudioToGallery(src, id) {
        const gallery = document.getElementById('quicknote-media-gallery');
        const container = document.createElement('div');
        container.className = 'relative';
        container.dataset.mediaId = id;

        const audio = document.createElement('audio');
        audio.controls = true;
        audio.src = src;
        audio.className = 'w-16 h-16';

        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'x';
        deleteBtn.className = 'absolute top-0 right-0 text-rose-500 hidden';
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentMedia.audio = currentMedia.audio.filter(item => item.id !== id);
            container.remove();
            saveNote();
        });

        container.addEventListener('mouseenter', () => { deleteBtn.classList.remove('hidden'); });
        container.addEventListener('mouseleave', () => { deleteBtn.classList.add('hidden'); });

        container.appendChild(audio);
        container.appendChild(deleteBtn);
        gallery.appendChild(container);
    }

    // -------------------------
    // LABEL MANAGEMENT & PILL BOXES
    // -------------------------
    function loadLabels() {
        return JSON.parse(localStorage.getItem('quickNote.labels')) || [];
    }

    function renderLabelList() {
        const labelList = document.getElementById('quicknote-label-list');
        labelList.innerHTML = '';
        const labels = loadLabels();
        labels.forEach(label => {
            const labelElem = document.createElement('div');
            labelElem.className = 'flex items-center justify-between border-b border-slate-200 px-2 py-1 group';

            const leftPart = document.createElement('label');
            leftPart.className = 'flex items-center';
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.value = label;
            checkbox.className = 'mr-2';
            if (currentNoteLabels.includes(label)) checkbox.checked = true;
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    if (!currentNoteLabels.includes(label)) currentNoteLabels.push(label);
                } else {
                    currentNoteLabels = currentNoteLabels.filter(l => l !== label);
                }
                updateLabelPills();
                saveNote();
            });
            leftPart.appendChild(checkbox);
            leftPart.appendChild(document.createTextNode(label));

            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'x';
            deleteBtn.className = 'text-rose-500 hidden';
            deleteBtn.addEventListener('click', () => {
                let labels = loadLabels();
                labels = labels.filter(l => l !== label);
                localStorage.setItem('quickNote.labels', JSON.stringify(labels));
                currentNoteLabels = currentNoteLabels.filter(l => l !== label);
                renderLabelList();
                updateLabelPills();
                saveNote();
            });
            labelElem.appendChild(leftPart);
            labelElem.appendChild(deleteBtn);

            labelElem.addEventListener('mouseenter', () => { deleteBtn.classList.remove('hidden'); });
            labelElem.addEventListener('mouseleave', () => { deleteBtn.classList.add('hidden'); });

            labelList.appendChild(labelElem);
        });
    }

    function updateLabelPills() {
        const pillsContainer = document.getElementById('quicknote-label-pills');
        pillsContainer.innerHTML = '';
        currentNoteLabels.forEach(label => {
            const pill = document.createElement('span');
            pill.className = 'relative inline-block bg-sky-200 text-sky-800 rounded-full px-3 py-1 text-xs mr-1 mb-1';
            pill.innerText = label;
            const deleteBtn = document.createElement('button');
            deleteBtn.innerText = 'x';
            deleteBtn.className = 'absolute top-0 right-0 text-rose-500 text-[10px] hidden';
            deleteBtn.addEventListener('click', () => {
                currentNoteLabels = currentNoteLabels.filter(l => l !== label);
                updateLabelPills();
                saveNote();
            });
            pill.addEventListener('mouseenter', () => { deleteBtn.classList.remove('hidden'); });
            pill.addEventListener('mouseleave', () => { deleteBtn.classList.add('hidden'); });
            pill.appendChild(deleteBtn);
            pillsContainer.appendChild(pill);
        });
    }

    const newLabelInput = document.getElementById('quicknote-new-label');
    newLabelInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const newLabel = this.value.trim();
            if (newLabel !== '') {
                let labels = loadLabels();
                if (!labels.includes(newLabel)) {
                    labels.push(newLabel);
                    localStorage.setItem('quickNote.labels', JSON.stringify(labels));
                    // fetch('https://example.com/endpoint/quicklabel', {
                    //   method: 'POST',
                    //   headers: { 'Content-Type': 'application/json' },
                    //   body: JSON.stringify({ label: newLabel })
                    // })
                    //   .then(response => console.log('Label saved:', response))
                    //   .catch(error => console.error('Error saving label:', error));
                }
                if (!currentNoteLabels.includes(newLabel)) {
                    currentNoteLabels.push(newLabel);
                }
                this.value = '';
                renderLabelList();
                updateLabelPills();
                saveNote();
            }
        }
    });
    const mngLbl = document.getElementById('quicknote-manage-labels');
    if (mngLbl) mngLbl.addEventListener('click', () => {
        renderLabelList();
        toggleModal('modal-labels', true);
    });
    document.getElementById('quicknote-close-modal-labels').addEventListener('click', () => {
        toggleModal('modal-labels', false);
    });
    document.getElementById('quicknote-save-labels').addEventListener('click', () => {
        const labelCheckboxes = document.querySelectorAll('#label-list input[type="checkbox"]');
        currentNoteLabels = [];
        labelCheckboxes.forEach(cb => {
            if (cb.checked) {
                currentNoteLabels.push(cb.value);
            }
        });
        updateLabelPills();
        toggleModal('modal-labels', false);
        saveNote();
    });

    // -------------------------
    // COLOR CUSTOMIZATION & OTHER MODALS
    // -------------------------
    const chsClr = document.getElementById('quicknote-choose-color');
    if (chsClr) chsClr.addEventListener('click', () => { toggleModal('modal-color', true); });
    document.getElementById('quicknote-close-modal-color').addEventListener('click', () => { toggleModal('modal-color', false); });
    document.getElementById('quicknote-save-color').addEventListener('click', () => {
        const bgColor = document.getElementById('quicknote-bg-color').value;
        const textColor = document.getElementById('quicknote-text-color').value;
        noteEditor.style.backgroundColor = bgColor;
        noteEditor.style.color = textColor;
        toggleModal('modal-color', false);
        saveNote();
    });

    // -------------------------
    // PINNING, ARCHIVE, DELETE, & DROPDOWN LOGIC
    // -------------------------
    function updatePinUI() {
        const pinBtn = document.getElementById('quicknote-pin-note');
        pinBtn.textContent = isPinned ? 'Unpin Note' : 'Pin Note';
        let pinIcon = document.getElementById('quicknote-pin-icon');
        if (isPinned) {
            if (!pinIcon) {
                pinIcon = document.createElement('div');
                pinIcon.id = 'pin-icon';
                pinIcon.innerHTML = `<span class="text-slate-400 group/qNotePin group-hover/qNotePin"><span class="group-hover/qNotePin:hidden"><svg fill="currentColor" class="h-5 w-5 p-[0.1rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Pro 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc.--><path d="M64 0L32 0l0 64 32 0 29.5 0L82.1 212.1C23.7 240.7 0 293 0 320l0 32 384 0 0-32c0-22.5-23.7-76.5-82.1-106.7L290.5 64 320 64l32 0 0-64L320 0 64 0zm96 480l0 32 64 0 0-32 0-96-64 0 0 96z"/></svg></span><span class="hidden group-hover/qNotePin:block"><svg fill="currentColor" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><!--!Font Awesome Pro 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2025 Fonticons, Inc.--><path d="M482.7 352l29.3 0 0-32c0-22.5-23.7-76.5-82.1-106.7L418.5 64 448 64l32 0 0-64L448 0 192 0 160 0l0 64 32 0 29.5 0-6.2 80.4L48.4 14.8 29.4 .1 0 38 19 52.7 591.5 497.2l19 14.7L639.9 474l-19-14.7L482.7 352zm-157.8 0L175.8 234.5C142.2 263 128 299.1 128 320l0 32 196.9 0zM288 480l0 32 64 0 0-32 0-96-64 0 0 96z"/></svg></span></span>`;
                pinIcon.className = 'absolute top-2 right-2 cursor-pointer';
                pinIcon.addEventListener('click', () => {
                    isPinned = false;
                    updatePinUI();
                    saveNote();
                });
                noteEditor.appendChild(pinIcon);
            }
        } else {
            if (pinIcon) {
                pinIcon.remove();
            }
        }
    }

    const pnNte = document.getElementById('quicknote-pin-note');
    if (pnNte) pnNte.addEventListener('click', () => {
        isPinned = !isPinned;
        updatePinUI();
        noteEditor.classList.toggle('border-sky-500', isPinned);
        document.getElementById('quicknote-dropdown-menu').classList.add('hidden');
        saveNote();
    });
    const tglArc = document.getElementById('quicknote-toggle-archive');
    if (tglArc) tglArc.addEventListener('click', () => {
        document.getElementById('quicknote-toggle-archive').classList.toggle('archived');
        saveNote();
    });
    const elpMnu = document.getElementById('quicknote-ellipsis-menu');
    if (elpMnu) elpMnu.addEventListener('click', () => {
        const dropdown = document.getElementById('quicknote-dropdown-menu');
        dropdown.classList.toggle('hidden');
    });

    const dltNte = document.getElementById('quicknote-delete-note');
    if (dltNte) dltNte.addEventListener('click', () => {
        toggleModal('modal-delete', true);
        document.getElementById('quicknote-dropdown-menu').classList.add('hidden');
    });
    document.getElementById('quicknote-cancel-delete').addEventListener('click', () => {
        toggleModal('modal-delete', false);
    });
    document.getElementById('quicknote-confirm-delete').addEventListener('click', () => {
        const currentPage = getCurrentPage();
        const retrievedData = currentPage.quickNotes;
        let storedNotes = retrievedData ? JSON.parse(retrievedData).notes : [];
        storedNotes = storedNotes.filter(n => n.id !== currentNoteId);

        const parsedData = retrievedData ? JSON.parse(retrievedData) : {};
        parsedData.notes = storedNotes;
        const json = JSON.stringify(parsedData);
        saveComponentObjectToPage('quickNotes', json);

        // old:
        // localStorage.setItem('quickNote.notes', JSON.stringify(storedNotes));
        currentNoteId = null;
        document.getElementById('quicknote-note-title').value = '';
        document.getElementById('quicknote-note-content').value = '';
        document.getElementById('quicknote-checkbox-container').classList.add('hidden');
        checkboxList.innerHTML = '';
        currentMedia = { images: [], audio: [] };
        currentNoteLabels = [];
        isChecklist = false;
        isPinned = false;
        toggleModal('modal-delete', false);
        renderNotes();
    });

    document.addEventListener('click', (e) => {
        const dropdown = document.getElementById('quicknote-dropdown-menu');
        const ellipsis = document.getElementById('quicknote-ellipsis-menu');
        if (!dropdown.contains(e.target) && !ellipsis.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });

    // ----- NOTE CREATION PILLBOX BEHAVIOR -----
    document.getElementById('quicknote-create-text-note').addEventListener('click', () => {
        openNoteEditor(null, 'text');
    });

    document.getElementById('quicknote-create-checkbox-note').addEventListener('click', () => {
        openNoteEditor(null, 'checkbox')
    });

    // ----- SEARCH FUNCTIONALITY & LABEL FILTERING -----
    const searchInput = document.getElementById('quicknote-search-input');
    searchInput.addEventListener('input', function () {
        const query = this.value.toLowerCase();
        // Assume note cards have class 'note-card' with data attributes (data-title, data-text, data-checklist, data-labels)
        const notes = document.querySelectorAll('.note-card');
        const criteriaCheckboxes = document.querySelectorAll('#search-criteria-dropdown input[type="checkbox"]');
        const criteria = [];
        criteriaCheckboxes.forEach(cb => { if (cb.checked) criteria.push(cb.dataset.criteria); });

        notes.forEach(note => {
            let match = false;
            criteria.forEach(c => {
                if (note.dataset[c] && note.dataset[c].toLowerCase().includes(query)) {
                    match = true;
                }
            });
            note.style.display = match ? '' : 'none';
        });
    });

    // Toggle search criteria dropdown
    document.getElementById('quicknote-search-criteria-btn').addEventListener('click', () => {
        document.getElementById('quicknote-search-criteria-dropdown').classList.toggle('hidden');
    });

    // ----- Label Filtering Dropdown -----
    document.getElementById('quicknote-label-filter-btn').addEventListener('click', () => {
        document.getElementById('quicknote-label-filter-dropdown').classList.toggle('hidden');
    });

    // Populate label filter list (assume loadLabels() returns an array of label strings)
    function populateLabelFilter() {
        const labelFilterList = document.getElementById('quicknote-label-filter-list');
        labelFilterList.innerHTML = '';
        const labels = loadLabels(); // Implement loadLabels() as needed (similar to Project One)
        labels.forEach(label => {
            const div = document.createElement('div');
            div.className = 'label-item cursor-pointer px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-800';
            div.textContent = label;
            labelFilterList.appendChild(div);
        });
    }
    populateLabelFilter();

    // Filter labels in the dropdown as user types
    document.getElementById('quicknote-label-filter-search').addEventListener('input', function () {
        const query = this.value.toLowerCase();
        document.querySelectorAll('#label-filter-list .label-item').forEach(label => {
            label.style.display = label.textContent.toLowerCase().includes(query) ? '' : 'none';
        });
    });

    // Filter notes by label when a label in the dropdown is clicked
    document.getElementById('quicknote-label-filter-list').addEventListener('click', (e) => {
        if (e.target.classList.contains('label-item')) {
            const selectedLabel = e.target.textContent.trim();
            const notes = document.querySelectorAll('.note-card');
            notes.forEach(note => {
                if (note.dataset.labels && note.dataset.labels.split(',').includes(selectedLabel)) {
                    note.style.display = '';
                } else {
                    note.style.display = 'none';
                }
            });
            // Optionally, indicate the selected filter visually and close the dropdown
            document.getElementById('quicknote-label-filter-dropdown').classList.add('hidden');
        }
    });

    // -------------------------
    // TOGGLE TEXT / CHECKLIST MODE
    // -------------------------
    const toggleModeBtn = document.getElementById('quicknote-toggle-mode');
    const noteContent = document.getElementById('quicknote-note-content');
    const checkboxContainer = document.getElementById('quicknote-checkbox-container');

    toggleModeBtn.addEventListener('click', () => {
        if (!isChecklist) {
            // Convert textarea to checklist mode (split on newlines)
            const lines = noteContent.value.split('\n');
            checkboxList.innerHTML = '';
            lines.forEach(line => createCheckboxItem(line));
            // Ensure there's always a trailing blank item
            if (!checkboxList.lastElementChild || checkboxList.lastElementChild.querySelector('input[type="text"]').value !== '') {
                createCheckboxItem('');
            }
            noteContent.classList.add('hidden');
            checkboxContainer.classList.remove('hidden');
            toggleModeBtn.textContent = 'Switch to Text';
            isChecklist = true;
        } else {
            // Convert checklist back to plain text
            let combinedText = '';
            const items = checkboxList.querySelectorAll('li');
            items.forEach((item, index) => {
                const input = item.querySelector('input[type="text"]');
                if (input) {
                    combinedText += input.value;
                    if (index < items.length - 1) {
                        combinedText += '\n';
                    }
                }
            });
            noteContent.value = combinedText;
            checkboxContainer.classList.add('hidden');
            noteContent.classList.remove('hidden');
            toggleModeBtn.textContent = 'Switch to Checklist';
            isChecklist = false;
        }
        saveNote();
    });

    // Call renderNotes on page load
    renderNotes();
}

window.initializeQuickNotes = initializeQuickNotes;