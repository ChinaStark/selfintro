// Simple i18n toggle for EN/中文
(function () {
  const dict = {
    en: {
      'page.title': 'Zhiliang Long - Research',
      'header.name': 'Zhiliang Long',
      'header.tagline': "Master's Candidate · CSSE, Shenzhen University",
      'nav.about': 'About',
      'nav.interests': 'Interests',
      'nav.news': 'News',
      'nav.publications': 'Publications',
      'nav.awards': 'Awards',
      'nav.projects': 'Projects',
      'nav.contact': 'Contact',
      'section.about': 'About',
      'about.body': "Hi! I'm Zhiliang Long. I am a master's candidate at Shenzhen University (CSSE), advised by <a href='https://orcid.org/0000-0002-7252-5346' target='_blank' rel='noopener'>MARK JunJie Li</a>. I explore the intersection of natural language understanding and database reasoning, focusing on NL2SQL, LLM reasoning reliability, and multi-agent methods.",
      'section.interests': 'Research Interests',
      'interests.1': 'NL2SQL (Natural Language to SQL)',
      'interests.2': 'LLM reasoning and reliability',
      'interests.3': 'Hallucination detection and mitigation',
      'interests.4': 'Multi-agent systems',
      'interests.5': 'Model tuning (RL, SFT)',
      'section.news': 'News',
      'section.publications': 'Publications',
      'section.projects': 'Projects',
      'section.awards': 'Awards',
      'awards.1.title': 'Bronze Medal, ICPC Jiangxi Provincial Programming Contest (2023)',
      'awards.1.desc': 'Competed as team leader and won a provincial bronze medal for algorithmic problem-solving and teamwork excellence.',
      'awards.2.title': '9th China Merchants Bank Digital Finance Bootcamp (2025)',
      'awards.2.desc': 'Awarded a 1888 RMB scholarship for excellence in LLM fine-tuning.',
      'proj.website.desc': 'Static website templates and components.',
      'proj.sql_forbase.desc': 'Practice repository for SQL basics (CRUD).',
      'proj.utils_pkg.desc': 'Python utility package and reusable helpers.',
      'proj.os_practice.desc': 'Notes and notebooks for OS coursework.',
      'proj.salesystem.desc': 'C++ MFC demo sales/inventory system.',
      'proj.datastruct.desc': 'Data structures exercises and implementations (C++).',
      'section.contact': 'Contact',
      'contact.email': 'Email:',
      'contact.office': 'Office:',
      'contact.links': 'Links:',
      'footer.updated': 'Last updated:'
    },
    zh: {
      'page.title': '龙智亮 - 研究主页',
      'header.name': '龙智亮（Zhiliang Long）',
      'header.tagline': '硕士研究生 · 深圳大学计算机与软件学院',
      'nav.about': '简介',
      'nav.interests': '研究兴趣',
      'nav.news': '动态',
      'nav.publications': '论文',
      'nav.awards': '奖项',
      'nav.projects': '项目',
      'nav.contact': '联系',
      'section.about': '简介',
      'about.body': "你好！我是龙智亮（Zhiliang Long）。我是深圳大学（计算机与软件学院）的硕士研究生，导师为 <a href='https://orcid.org/0000-0002-7252-5346' target='_blank' rel='noopener'>李俊杰（MARK JunJie Li）</a>。我的研究方向是自然语言理解与数据库推理的交叉，关注 NL2SQL、LLM 推理可靠性与多智能体方法。",
      'section.interests': '研究兴趣',
      'interests.1': 'NL2SQL（自然语言转 SQL）',
      'interests.2': 'LLM 推理与可靠性',
      'interests.3': '幻觉检测与缓解',
      'interests.4': '多智能体系统',
      'interests.5': '模型调优（RL、SFT）',
      'section.news': '动态',
      'section.publications': '论文',
      'section.projects': '项目',
      'section.awards': '奖项',
      'awards.1.title': 'ICPC 江西省程序设计竞赛 铜牌（2023）',
      'awards.1.desc': '作为队长参赛，因算法问题求解与团队协作表现获得省赛铜牌。',
      'awards.2.title': '第九届招商银行数字金融训练营（2025）',
      'awards.2.desc': '在 LLM 微调方面表现优异，获 1888 元奖学金。',
      'proj.website.desc': '静态网站模板与组件。',
      'proj.sql_forbase.desc': 'SQL 基础练习（增删改查）。',
      'proj.utils_pkg.desc': 'Python 工具包与可复用助手。',
      'proj.os_practice.desc': '操作系统课程笔记与 Notebook。',
      'proj.salesystem.desc': 'C++ MFC 演示销售/库存系统。',
      'proj.datastruct.desc': '数据结构练习与实现（C++）。',
      'section.contact': '联系',
      'contact.email': '邮箱：',
      'contact.office': '办公室：',
      'contact.links': '链接：',
      'footer.updated': '最后更新：'
    }
  };

  function applyLang(lang) {
    const strings = dict[lang] || dict.en;
    document.documentElement.lang = lang;
    // Update title
    if (strings['page.title']) document.title = strings['page.title'];
    // Update elements with data-i18n
    const allowHTML = new Set(['about.body']);
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const txt = strings[key];
      if (typeof txt === 'string') {
        if (allowHTML.has(key)) {
          el.innerHTML = txt;
        } else {
          el.textContent = txt;
        }
      }
    });
    // Toggle button label
    const btn = document.getElementById('lang-toggle');
    if (btn) btn.textContent = lang === 'en' ? 'CN' : 'EN';
    try { localStorage.setItem('lang', lang); } catch {}
  }

  function init() {
    let lang = 'en';
    try {
      lang = localStorage.getItem('lang') || lang;
    } catch {}
    if (!localStorage.getItem('lang')) {
      if (navigator.language && navigator.language.toLowerCase().startsWith('zh')) {
        lang = 'zh';
      }
    }
    applyLang(lang);
    const btn = document.getElementById('lang-toggle');
    if (btn) {
      btn.addEventListener('click', () => {
        lang = (document.documentElement.lang === 'zh') ? 'en' : 'zh';
        applyLang(lang);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

