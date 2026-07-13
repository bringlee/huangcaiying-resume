document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('nav');
    const menuBtn = document.getElementById('menuBtn');
    const navLinks = document.getElementById('navLinks');
    const backTop = document.getElementById('backTop');
    const counters = document.querySelectorAll('.kpi-number');

    // 导航滚动效果
    function handleScroll() {
        if (window.scrollY > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            backTop.classList.add('visible');
        } else {
            backTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 移动端菜单
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // 点击链接后关闭菜单
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = target.offsetTop - 100;
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 数字计数动画
    const countUp = (el, target) => {
        let current = 0;
        const duration = 1500;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            current += step;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, 16);
    };

    // 图表动画
    const animateCharts = () => {
        // 环形图
        document.querySelectorAll('.donut-progress').forEach(circle => {
            const percent = parseFloat(circle.getAttribute('data-percent'));
            const circumference = 2 * Math.PI * 50;
            const offset = circumference - (percent / 100) * circumference;
            circle.style.strokeDasharray = circumference;
            circle.style.strokeDashoffset = offset;
        });

        // 柱状图
        document.querySelectorAll('.bar-fill').forEach(bar => {
            const width = bar.getAttribute('data-width');
            setTimeout(() => {
                bar.style.width = width + '%';
            }, 200);
        });

        // 技能进度条
        document.querySelectorAll('.skill-bar-fill').forEach(fill => {
            const width = fill.getAttribute('data-width');
            setTimeout(() => {
                fill.style.width = width + '%';
            }, 200);
        });
    };

    // Intersection Observer 用于滚动动画
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    let counterAnimated = false;

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // 触发计数器
                if (entry.target.classList.contains('metrics') && !counterAnimated) {
                    counterAnimated = true;
                    counters.forEach(counter => {
                        const target = parseInt(counter.getAttribute('data-target'));
                        countUp(counter, target);
                    });
                    animateCharts();
                }
            }
        });
    }, observerOptions);

    // 添加 reveal 类并观察
    const revealElements = document.querySelectorAll('.section-header, .metric-card, .about-card, .timeline-item, .skill-bars, .certificates, .skill-tags, .edu-card, .contact-card');
    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // 单独观察 metrics 区域用于触发图表
    const metricsSection = document.querySelector('.metrics');
    if (metricsSection) {
        metricsSection.classList.add('reveal');
        revealObserver.observe(metricsSection);
    }

    // 触发 Hero 区域动画
    setTimeout(() => {
        document.querySelector('.hero-card').classList.add('active');
    }, 100);

    // 技能标签错落动画
    document.querySelectorAll('.skill-tags span').forEach((tag, index) => {
        tag.style.transitionDelay = `${index * 50}ms`;
    });

    console.log('黄才莹个人简历网站已加载');
});
