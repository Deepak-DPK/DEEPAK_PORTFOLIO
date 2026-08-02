document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Sidebar Toggle ---
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileCloseBtn = document.getElementById('mobile-close');
    const explorer = document.getElementById('explorer');

    if (mobileMenuBtn && mobileCloseBtn && explorer) {
        mobileMenuBtn.addEventListener('click', () => {
            explorer.classList.add('active');
        });
        
        mobileCloseBtn.addEventListener('click', () => {
            explorer.classList.remove('active');
        });
    }

    // --- Folder Toggle ---
    const folderTitles = document.querySelectorAll('.folder-title');
    folderTitles.forEach(title => {
        title.addEventListener('click', () => {
            title.parentElement.classList.toggle('open');
        });
    });

    // --- Navigation & Tabs ---
    const fileLinks = document.querySelectorAll('.file-list a[href^="#"]');
    const activeTab = document.getElementById('active-tab');
    const editorContent = document.getElementById('editor-content');

    fileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Update active state in sidebar
            fileLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Update tab name
            const fileName = link.getAttribute('data-file');
            if (fileName && activeTab) {
                activeTab.innerHTML = `${fileName} <span class="close">×</span>`;
            }
            
            // Close mobile menu on click
            if (window.innerWidth <= 900) {
                explorer.classList.remove('active');
            }
        });
    });

    // Update active tab based on scroll position
    if (editorContent) {
        editorContent.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('.lesson-section');
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (editorContent.scrollTop >= (sectionTop - 150)) {
                    current = section.getAttribute('id');
                }
            });

            fileLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                    const fileName = link.getAttribute('data-file');
                    if (fileName && activeTab) {
                        activeTab.innerHTML = `${fileName} <span class="close">×</span>`;
                    }
                }
            });
        });
    }

    // --- Signature Live Typing Hero ---
    const typingCode = document.getElementById('typing-code');
    const cursor = document.getElementById('cursor');
    const executionResult = document.getElementById('execution-result');
    
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const codeToType = `class Instructor:
    def __init__(self):
        self.name = "Deepak R."
        self.role = "Software Development Instructor"
        self.focus = ["Backend", "AI Coding", "Databases"]
        
    def execute_intro(self):
        return "Rendering profile..."
        
instructor = Instructor()
instructor.execute_intro()`;

    // Basic syntax highlighting for the typed text
    function highlightSyntax(text) {
        return text
            .replace(/class /g, '<span class="keyword">class </span>')
            .replace(/def /g, '<span class="keyword">def </span>')
            .replace(/self/g, '<span class="keyword">self</span>')
            .replace(/return /g, '<span class="keyword">return </span>')
            .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>');
    }

    let i = 0;
    const typingSpeed = 20; // ms per character

    function typeWriter() {
        if (prefersReducedMotion) {
            // Skip animation
            typingCode.innerHTML = highlightSyntax(codeToType);
            showExecution();
            return;
        }

        if (i < codeToType.length) {
            // To properly highlight while typing without breaking HTML, 
            // we update the raw text and then run it through the highlighter
            const currentText = codeToType.substring(0, i + 1);
            typingCode.innerHTML = highlightSyntax(currentText);
            i++;
            
            // Randomize typing speed slightly for realism
            const speed = Math.random() * 20 + typingSpeed;
            setTimeout(typeWriter, speed);
        } else {
            // Finished typing, blink cursor a few times then show result
            setTimeout(showExecution, 800);
        }
    }

    function showExecution() {
        if (cursor) cursor.style.display = 'none';
        if (executionResult) {
            executionResult.classList.remove('hidden');
        }
    }

    // Start the animation if the element exists
    if (typingCode) {
        // Initial delay before typing starts
        setTimeout(typeWriter, 500);
    }
});
