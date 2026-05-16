import React, { createContext, useContext, useState } from 'react';

export type Lang = 'en' | 'ar';

interface LangCtx {
  lang: Lang;
  setLang: (l: Lang) => void;
  rtl: boolean;
  t: (key: string) => string;
}

const DICT: Record<string, Record<Lang, string>> = {
  // Navigation
  'nav.dashboard':   { en: 'Dashboard',   ar: 'لوحة التحكم'  },
  'nav.recruitment': { en: 'Recruitment', ar: 'التوظيف'      },
  'nav.employees':   { en: 'Employees',   ar: 'الموظفون'     },
  'nav.payroll':     { en: 'Payroll',     ar: 'الرواتب'      },
  'nav.messages':    { en: 'Messages',    ar: 'الرسائل'      },
  'nav.settings':    { en: 'Settings',    ar: 'الإعدادات'    },
  'nav.profile':     { en: 'Profile',     ar: 'الملف الشخصي' },
  'nav.orgchart':    { en: 'Org Chart',   ar: 'الهيكل التنظيمي' },
  'nav.attendance':  { en: 'Attendance',  ar: 'الحضور والإنصراف' },
  'nav.performance': { en: 'Performance', ar: 'الأداء' },

  // Org Chart
  'org.title':       { en: 'Organization Structure', ar: 'الهيكل التنظيمي للمؤسسة' },
  'org.subtitle':    { en: 'Visual representation of teams and reporting lines', ar: 'تمثيل مرئي للفرق وخطوط الإبلاغ' },
  'org.ceo':         { en: 'Chief Executive Officer', ar: 'الرئيس التنفيذي' },
  'org.cto':         { en: 'Chief Technology Officer', ar: 'الرئيس التقني' },
  'org.cfo':         { en: 'Chief Financial Officer', ar: 'الرئيس المالي' },
  'org.hr_dir':      { en: 'HR Director', ar: 'مدير الموارد البشرية' },
  'org.eng_lead':    { en: 'Engineering Lead', ar: 'قائد الهندسة' },
  'org.design_lead': { en: 'Design Lead', ar: 'قائد التصميم' },
  'org.reports':     { en: 'Direct Reports', ar: 'تقارير مباشرة' },

  // Attendance
  'att.title':       { en: 'Time & Attendance', ar: 'الحضور والإنصراف' },
  'att.clock_in':    { en: 'Clock In',    ar: 'تسجيل الحضور' },
  'att.clock_out':   { en: 'Clock Out',   ar: 'تسجيل الإنصراف' },
  'att.status':      { en: 'Current Status', ar: 'الحالة الحالية' },
  'att.on_duty':     { en: 'On Duty',     ar: 'على رأس العمل' },
  'att.off_duty':    { en: 'Off Duty',    ar: 'خارج العمل' },
  'att.timesheet':   { en: 'Recent Timesheets', ar: 'سجلات الحضور الأخيرة' },
  'att.hours':       { en: 'Hours Worked', ar: 'ساعات العمل' },
  'att.overtime':    { en: 'Overtime',    ar: 'ساعات إضافية' },
  'att.date':        { en: 'Date',        ar: 'التاريخ' },

  // Performance
  'perf.title':      { en: 'Performance & OKRs', ar: 'الأداء والأهداف' },
  'perf.score':      { en: 'Performance Score', ar: 'درجة الأداء' },
  'perf.goals':      { en: 'Active Goals', ar: 'الأهداف النشطة' },
  'perf.reviews':    { en: 'Quarterly Reviews', ar: 'المراجعات الربع سنوية' },
  'perf.progress':   { en: 'Goal Progress', ar: 'التقدم في الأهداف' },

  // Landing Page
  'landing.hero_title':   { en: 'Transform Chaos into Clear Management Insights', ar: 'حول الفوضى إلى رؤى إدارية واضحة' },
  'landing.hero_sub':     { en: 'A Better Way to Manage Your Workforce. Sign Up Now To Get The Whole Experience', ar: 'طريقة أفضل لإدارة القوى العاملة لديك. سجل الآن للحصول على التجربة الكاملة' },
  'landing.cta_signup':   { en: 'Your Success Starts From Here', ar: 'نجاحك يبدأ من هنا' },
  'landing.nav_home':     { en: 'Home', ar: 'الرئيسية' },
  'landing.nav_features': { en: 'Features', ar: 'المميزات' },
  'landing.nav_reviews':  { en: 'Reviews', ar: 'التقييمات' },
  'landing.nav_plans':    { en: 'Plans', ar: 'الخطط' },
  'landing.nav_faqs':     { en: 'FAQs', ar: 'الأسئلة الشائعة' },
  'landing.nav_login':    { en: 'Log In', ar: 'تسجيل الدخول' },
  'landing.nav_signup':   { en: 'Sign Up', ar: 'إنشاء حساب' },
  'landing.feature_1':    { en: 'Smart Attendance Tracking', ar: 'تتبع الحضور الذكي' },
  'landing.feature_2':    { en: 'Payroll & Salary Automation', ar: 'أتمتة الرواتب والأجور' },
  'landing.feature_3':    { en: 'Performance & KPI Insights', ar: 'رؤى الأداء ومؤشرات الأداء' },
  'landing.pricing_title': { en: 'Choose Your Perfect Plan For Your Business', ar: 'اختر الخطة المثالية لعملك' },
  'landing.pricing_sub':   { en: 'Find the plan that fits your team\'s needs and scales with your growth.', ar: 'ابحث عن الخطة التي تناسب احتياجات فريقك وتتوسع مع نموك.' },

  // App
  'app.subtitle':    { en: 'Staffio HR Platform', ar: 'منصة ستافيو لإدارة الموارد البشرية' },
  'app.search':      { en: 'Search employees, jobs, reports…', ar: 'ابحث عن موظف، وظيفة، تقرير…' },
  'app.status':      { en: 'All systems operational',  ar: 'جميع الأنظمة تعمل' },
  'app.logo_sub':    { en: 'HR Intelligence', ar: 'منصة الموارد البشرية' },
  'app.logout':      { en: 'Logout', ar: 'تسجيل الخروج' },

  // User
  'user.name':       { en: 'John Doe', ar: 'جون دو' },

  // Actions
  'action.filter':    { en: 'Filter',     ar: 'تصفية'      },
  'action.new_entry': { en: 'New Entry',  ar: 'إدخال جديد' },
  'action.export':    { en: 'Export CSV', ar: 'تصدير CSV'  },
  'action.save':      { en: 'Save',       ar: 'حفظ'        },
  'action.cancel':    { en: 'Cancel',     ar: 'إلغاء'      },
  'action.edit':      { en: 'Edit Profile', ar: 'تعديل الملف' },

  // Dashboard
  'dash.total_emp':    { en: 'Total Employees',    ar: 'إجمالي الموظفين'   },
  'dash.total_emp_sub':{ en: '+18 this month',     ar: '+18 هذا الشهر'    },
  'dash.active_sub':   { en: 'Working now',        ar: 'يعملون الآن'      },
  'dash.perf_sub':     { en: 'Last 30 days',       ar: 'آخر 30 يوم'       },
  'dash.open_pos':     { en: 'Open Positions',     ar: 'الوظائف الشاغرة'  },
  'dash.efficiency':   { en: 'Efficiency Rate',    ar: 'معدل الكفاءة'     },
  'dash.system_load':  { en: 'System Load',        ar: 'حمل النظام'       },
  'dash.recent':       { en: 'Recent Personnel Activity', ar: 'النشاط الأخير للموظفين' },
  'dash.activity':     { en: 'Activity This Week', ar: 'نشاط هذا الأسبوع' },
  'dash.sys_status':   { en: 'System Status',      ar: 'حالة النظام'      },
  'dash.vs_month':     { en: 'vs last month',      ar: 'مقارنة بالشهر الماضي' },
  'dash.pending':      { en: 'Pending review',     ar: 'قيد المراجعة'    },
  'dash.verified':     { en: 'Verified',            ar: 'موثق'            },
  'dash.in_progress':  { en: 'In Progress',         ar: 'جارٍ التنفيذ'   },
  'dash.critical':     { en: 'Critical',            ar: 'حرج'            },

  // Nodes
  'dash.node_db':      { en: 'Database',   ar: 'قاعدة البيانات' },
  'dash.node_api':     { en: 'API Server',  ar: 'خادم التطبيق'   },
  'dash.node_auth':    { en: 'Auth Layer',  ar: 'طبقة التحقق'   },
  'dash.node_healthy': { en: 'Healthy',    ar: 'سليم'          },
  'dash.node_online':  { en: 'Online',     ar: 'متصل'          },
  'dash.node_secured': { en: 'Secured',    ar: 'مؤمن'          },

  // Days
  'day.m': { en: 'M', ar: 'ن' },
  'day.t': { en: 'T', ar: 'ث' },
  'day.w': { en: 'W', ar: 'ر' },
  'day.th':{ en: 'T', ar: 'خ' },
  'day.f': { en: 'F', ar: 'ج' },
  'day.s': { en: 'S', ar: 'س' },
  'day.su':{ en: 'S', ar: 'ح' },

  // Profile
  'profile.title':       { en: 'Profile',             ar: 'الملف الشخصي'     },
  'profile.info':        { en: 'Personal Information', ar: 'المعلومات الشخصية'  },
  'profile.role':        { en: 'Lead HR Manager',      ar: 'مدير موارد بشرية أول' },
  'profile.email':       { en: 'Email Address',        ar: 'البريد الإلكتروني' },
  'profile.phone':       { en: 'Phone Number',         ar: 'رقم الجوال'        },
  'profile.location':    { en: 'Office Location',      ar: 'موقع المكتب'       },
  'profile.loc_val':     { en: 'Riyadh, Saudi Arabia', ar: 'الرياض، المملكة العربية السعودية' },
  'profile.joined':      { en: 'Join Date',            ar: 'تاريخ الانضمام'    },
  'profile.join_val':    { en: 'January 2022',         ar: 'يناير 2022'        },
  'profile.dept':        { en: 'Department',           ar: 'القسم'             },
  'profile.dept_hr':     { en: 'Human Resources',      ar: 'الموارد البشرية'    },
  'profile.skills':      { en: 'Professional Skills',  ar: 'المهارات المهنية'  },
  'profile.activity':    { en: 'Recent Activity',      ar: 'النشاط الأخير'      },
  'profile.performance': { en: 'Performance',          ar: 'الأداء'            },
  'profile.attendance':  { en: 'Attendance',           ar: 'الحضور'            },
  'profile.tasks':       { en: 'Tasks',                ar: 'المهام'            },
  'profile.clearance':   { en: 'Clearance',            ar: 'التصريح'           },
  'profile.devices':     { en: 'Linked Devices',       ar: 'الأجهزة المرتبطة'   },

  // Devices
  'device.macbook':      { en: 'MacBook Pro 14"',      ar: 'ماك بوك برو 14 بوصة' },
  'device.primary':      { en: 'Primary device',       ar: 'الجهاز الأساسي'    },
  'device.iphone':       { en: 'iPhone 15 Pro',        ar: 'آيفون 15 برو'      },
  'device.mobile':       { en: 'Mobile',               ar: 'جوال'              },
  'device.card':         { en: 'Access Card',          ar: 'بطاقة الدخول'      },
  'device.card_id':      { en: 'ID: HR-2024-001',      ar: 'رقم التعريف: HR-2024-001' },

  // Events
  'event.session':       { en: 'Session Started',      ar: 'بدء الجلسة'       },
  'event.updated':       { en: 'Profile Updated',      ar: 'تحديث الملف'      },
  'event.failed':        { en: 'Login Attempt Failed', ar: 'محاولة دخول فاشلة' },
  'event.sync':          { en: 'Mobile App Sync',      ar: 'مزامنة التطبيق'    },

  // Nodes/Systems
  'sys.chrome':          { en: 'Chrome / Windows',     ar: 'كروم / ويندوز'    },
  'sys.system':          { en: 'System',               ar: 'النظام'           },
  'sys.unknown':         { en: 'Unknown Device',       ar: 'جهاز غير معروف'    },
  'sys.iphone':          { en: 'iPhone 15',            ar: 'آيفون 15'         },

  // Skills
  'skill.mgmt':          { en: 'HR Management',         ar: 'إدارة الموارد البشرية' },
  'skill.talent':        { en: 'Talent Acquisition',    ar: 'استقطاب المواهب'     },
  'skill.payroll':       { en: 'Payroll Administration',ar: 'إدارة الرواتب'       },
  'skill.law':           { en: 'Labor Law Compliance',  ar: 'الامتثال لقانون العمل' },
  'skill.data':          { en: 'Data Analytics',        ar: 'تحليل البيانات'      },

  // Relative Time
  'time.now':            { en: 'Just now',             ar: 'الآن'              },
  'time.2m':             { en: '2m ago',               ar: 'منذ دقيقتين'        },
  'time.9m':             { en: '9m ago',               ar: 'منذ 9 دقائق'       },
  'time.15m':            { en: '15m ago',              ar: 'منذ 15 دقيقة'      },
  'time.22m':            { en: '22m ago',              ar: 'منذ 22 دقيقة'      },
  'time.30m':            { en: '30m ago',              ar: 'منذ 30 دقيقة'      },
  'time.1h':             { en: '1h ago',               ar: 'منذ ساعة'          },
  'time.3h':             { en: '3h ago',               ar: 'منذ 3 ساعات'       },
  'time.5h':             { en: '5h ago',               ar: 'منذ 5 ساعات'       },
  'time.yesterday':      { en: 'Yesterday',            ar: 'أمس'               },
  'time.2d':             { en: '2 days ago',           ar: 'منذ يومين'         },
  'time.4d':             { en: '4 days ago',           ar: 'منذ 4 أيام'        },
  'time.1w':             { en: '1 week ago',           ar: 'منذ أسبوع'         },
  'time.2w':             { en: '2 weeks ago',          ar: 'منذ أسبوعين'       },

  // Status
  'status.active':   { en: 'Active',    ar: 'نشط'      },
  'status.pending':  { en: 'Pending',   ar: 'معلق'     },
  'status.inactive': { en: 'Inactive',  ar: 'غير نشط'  },
  'status.healthy':  { en: 'Healthy',   ar: 'سليم'     },
  'status.online':   { en: 'Online',    ar: 'متصل'     },
  'status.offline':  { en: 'Offline',   ar: 'غير متصل' },
  'status.success':  { en: 'Success',   ar: 'ناجح'     },
  'status.failure':  { en: 'Failure',   ar: 'فاشل'     },
  'status.disbursed':{ en: 'Disbursed', ar: 'تم الصرف'  },
  'status.secured':  { en: 'Secured',    ar: 'مؤمن'     },

  // Recruitment
  'rec.open_pos':    { en: 'Open Positions',   ar: 'الوظائف الشاغرة'  },
  'rec.funnel':      { en: 'Hiring Funnel',    ar: 'قمع التوظيف'      },
  'rec.metrics':     { en: 'Pipeline Metrics', ar: 'مقاييس التوظيف'   },
  'rec.ai_screen':   { en: 'AI Screening',     ar: 'الفحص الذكي'      },
  'rec.ai_desc':     { en: 'AI screening is enabled for all open roles. 84 candidates processed in the last 24 hours.', ar: 'فحص الذكاء الاصطناعي مفعل لجميع الوظائف. تم فحص 84 مرشحاً في آخر 24 ساعة.' },
  'rec.quick_stats': { en: 'Quick Stats',      ar: 'إحصائيات سريعة'   },
  'rec.applicants':  { en: 'Applicants',       ar: 'المتقدمين'        },
  'rec.posted':      { en: 'Posted',           ar: 'نُشر قبل'         },
  'rec.priority':    { en: 'Priority',         ar: 'الأولوية'         },
  'rec.high':        { en: 'High',             ar: 'عالية'            },
  'rec.medium':      { en: 'Medium',           ar: 'متوسطة'           },
  'rec.low':         { en: 'Low',              ar: 'منخفضة'           },
  'rec.view_report': { en: 'View Report',      ar: 'عرض التقرير'      },
  'rec.pipeline':    { en: 'Pipeline Health',  ar: 'صحة خط التوظيف'   },
  'rec.time_hire':   { en: 'Avg. Time to Hire',ar: 'متوسط وقت التوظيف'},
  'rec.diversity':   { en: 'Diversity Index',  ar: 'مؤشر التنوع'      },
  'rec.offers':      { en: 'Offers Extended',  ar: 'العروض المقدمة'   },
  'rec.interviews':  { en: 'Interviews Today', ar: 'مقابلات اليوم'    },
  'rec.avg_salary':  { en: 'Avg. Salary Offered', ar: 'متوسط الراتب المعروض' },

  // Recruitment Data
  'job.senior_fe':   { en: 'Senior Frontend Engineer', ar: 'مهندس واجهة أمامية أول' },
  'job.ux_designer': { en: 'UX / Product Designer',    ar: 'مصمم تجربة مستخدم'      },
  'job.supply_chain':{ en: 'Supply Chain Manager',     ar: 'مدير سلسلة التوريد'      },
  'job.data_analyst':{ en: 'Data Analyst',             ar: 'محلل بيانات'             },

  'stage.applied':   { en: 'Applied',                  ar: 'تم التقديم'              },
  'stage.screening': { en: 'Screening',                ar: 'فحص أولي'                },
  'stage.interview': { en: 'Interview',                ar: 'مقابلة'                  },
  'stage.offer':     { en: 'Offer',                    ar: 'عرض عمل'                 },
  'stage.hired':     { en: 'Hired',                    ar: 'تم التوظيف'              },

  // Employee Data
  'role.senior_eng':  { en: 'Senior Engineer',      ar: 'مهندس أول'               },
  'role.ux_lead':     { en: 'UX Lead',              ar: 'قائد تجربة المستخدم'     },
  'role.proc_eng':    { en: 'Process Engineer',     ar: 'مهندس عمليات'            },
  'role.fin_analyst': { en: 'Finance Analyst',      ar: 'محلل مالي'               },
  'role.hr_spec':     { en: 'HR Specialist',        ar: 'أخصائي موارد بشرية'      },
  'role.acc_exec':    { en: 'Account Executive',    ar: 'مسؤول حسابات'            },
  'role.be_dev':      { en: 'Backend Developer',    ar: 'مطور خلفية'              },
  'role.prod_design': { en: 'Product Designer',     ar: 'مصمم منتجات'             },

  'dept.eng':         { en: 'Engineering',          ar: 'الهندسة'                },
  'dept.design':      { en: 'Design',               ar: 'التصميم'                },
  'dept.ops':         { en: 'Operations',           ar: 'العمليات'               },
  'dept.fin':         { en: 'Finance',              ar: 'المالية'                },
  'dept.hr':          { en: 'HR',                   ar: 'الموارد البشرية'        },
  'dept.sales':       { en: 'Sales',                ar: 'المبيعات'               },
  'dept.all':         { en: 'All',                  ar: 'الكل'                   },

  'emp.active':      { en: 'Active',           ar: 'على رأس العمل'    },
  'emp.pending':     { en: 'Needs Action',     ar: 'تحتاج إجراء'      },
  'emp.performance': { en: 'Avg. Performance', ar: 'متوسط الأداء'     },
  'emp.dept_all':    { en: 'All',              ar: 'الكل'             },
  'emp.dept_eng':    { en: 'Engineering',      ar: 'الهندسة'          },
  'emp.dept_design': { en: 'Design',           ar: 'التصميم'          },
  'emp.dept_ops':    { en: 'Operations',       ar: 'العمليات'         },
  'emp.dept_fin':    { en: 'Finance',          ar: 'المالية'          },
  'emp.dept_hr':     { en: 'HR',               ar: 'الموارد البشرية'  },
  'emp.dept_sales':  { en: 'Sales',            ar: 'المبيعات'         },
  'emp.col_emp':     { en: 'Employee',         ar: 'الموظف'           },
  'emp.col_role':    { en: 'Role',             ar: 'الوظيفة'          },
  'emp.col_dept':    { en: 'Department',       ar: 'القسم'            },
  'emp.col_status':  { en: 'Status',           ar: 'الحالة'           },
  'emp.col_perf':    { en: 'Performance',      ar: 'الأداء'           },
  'emp.col_joined':  { en: 'Joined',           ar: 'تاريخ الانضمام'   },


  // Payroll
  'pay.title':       { en: 'Payroll Batches — 2026', ar: 'دفعات الرواتب — 2026' },
  'pay.monthly':     { en: 'Monthly Total',    ar: 'الإجمالي الشهري'  },
  'pay.tax':         { en: 'Tax Liability',    ar: 'الالتزامات الضريبية'},
  'pay.bonus':       { en: 'Bonus Provision',  ar: 'مخصص المكافآت'    },
  'pay.compliance':  { en: 'Compliance',       ar: 'الامتثال'         },
  'pay.batches':     { en: 'Payroll Batches',  ar: 'دفعات الرواتب'    },
  'pay.batch_id':    { en: 'Batch ID',         ar: 'رقم الدفعة'       },
  'pay.period':      { en: 'Period',           ar: 'الفترة'           },
  'pay.employees':   { en: 'Employees',        ar: 'الموظفين'         },
  'pay.gross':       { en: 'Gross',            ar: 'الإجمالي'         },
  'pay.net':         { en: 'Net Pay',          ar: 'صافي الراتب'      },
  'pay.showing':     { en: 'Showing',          ar: 'عرض'              },
  'pay.of':          { en: 'of',               ar: 'من'               },
  'pay.prev':        { en: 'Previous',         ar: 'السابق'           },
  'pay.next':        { en: 'Next',             ar: 'التالي'           },
  'pay.cycles':      { en: 'payroll cycles',   ar: 'دورات رواتب'      },
  'pay.vs_month':    { en: '+4.2% vs last month', ar: '+4.2% مقارنة بالشهر الماضي' },
  'pay.due_72h':     { en: 'Due in 72 hours',     ar: 'مستحق خلال 72 ساعة'     },
  'pay.q2_alloc':    { en: 'Allocated for Q2',    ar: 'مخصص للربع الثاني'      },
  'pay.audits_pass': { en: 'All audits passed',   ar: 'تم اجتياز جميع عمليات التدقيق' },

  // Messages
  'msg.search':      { en: 'Search conversations…', ar: 'بحث في المحادثات…' },
  'msg.write':       { en: 'Write a message…',      ar: 'اكتب رسالة…'      },
  'msg.today':       { en: 'Today',                 ar: 'اليوم'            },
  'msg.delivered':   { en: 'Delivered',             ar: 'تم التسليم'         },
  'msg.online':      { en: 'Online',                ar: 'متصل'             },
  'msg.offline':     { en: 'Offline',               ar: 'غير متصل'          },

  // Message Data
  'msg.last.report':  { en: 'The report has been finalized.',        ar: 'تم اعتماد التقرير النهائي.' },
  'msg.last.inspect': { en: 'Site inspection is pending review.',   ar: 'فحص الموقع بانتظار المراجعة.' },
  'msg.last.logist':  { en: 'Logistics update is ready to share.',  ar: 'تحديث اللوجستيات جاهز للمشاركة.' },
  'msg.last.pay':     { en: 'Payroll sync completed successfully.', ar: 'تمت مزامنة الرواتب بنجاح.' },

  'msg.chat.recv':    { en: 'The reports for Q2 are finalized and uploaded. Please verify the calculations for payroll batch May 2026.', ar: 'تقارير الربع الثاني معتمدة ومرفوعة. يرجى التحقق من حسابات دفعة رواتب مايو 2026.' },
  'msg.chat.sent':    { en: 'Acknowledged! I\'ll review the data and get back to you within the hour.', ar: 'علم! سأراجع البيانات وأرد عليك خلال ساعة.' },

  // Settings
  'set.general':     { en: 'General',          ar: 'عام'               },
  'set.lang':        { en: 'Language',         ar: 'اللغة'             },
  'set.lang_sub':    { en: 'Choose your preferred interface language', ar: 'اختر لغة الواجهة المفضلة لديك' },
  'set.sync':        { en: 'Data Sync',        ar: 'مزامنة البيانات'   },
  'set.sync_sub':    { en: 'How often the dashboard refreshes data', ar: 'معدل تحديث بيانات لوحة التحكم' },
  'set.realtime':    { en: 'Real-time',        ar: 'في الوقت الفعلي'   },
  'set.security':    { en: 'Security',         ar: 'الأمان'            },
  'set.2fa':         { en: 'Two-Factor Authentication', ar: 'المصادقة الثنائية' },
  'set.2fa_sub':     { en: 'Require 2FA on every login', ar: 'طلب المصادقة الثنائية عند كل تسجيل دخول' },
  'set.timeout':     { en: 'Session Timeout',  ar: 'انتهاء الجلسة'    },
  'set.timeout_sub': { en: 'Auto sign-out after 30 minutes of inactivity', ar: 'تسجيل الخروج التلقائي بعد 30 دقيقة من الخمول' },
  'set.enabled':     { en: 'Enabled',          ar: 'مفعل'             },
  'set.disabled':    { en: 'Disabled',         ar: 'معطل'              },
  'set.notif':       { en: 'Notifications',    ar: 'التنبيهات'         },
  
  // Notifications
  'set.notif_hiring': { en: 'Hiring & Onboarding', ar: 'التوظيف والتهيئة' },
  'set.notif_hiring_sub': { en: 'Updates on new hires, offers, and onboarding stages', ar: 'تحديثات الموظفين الجدد، العروض، ومراحل التهيئة' },
  'set.notif_payroll': { en: 'Payroll Reports', ar: 'تقارير الرواتب' },
  'set.notif_payroll_sub': { en: 'Payroll cycle completions and disbursement alerts', ar: 'تنبيهات اكتمال دورات الرواتب والصرف' },
  'set.notif_sec': { en: 'Security Alerts', ar: 'تنبيهات الأمان' },
  'set.notif_sec_sub': { en: 'Login attempts, access changes, and audit logs', ar: 'محاولات تسجيل الدخول، تغييرات الوصول، وسجلات المراجعة' },

  // App Info
  'set.info':        { en: 'Application Info', ar: 'معلومات التطبيق'    },
  'set.version':     { en: 'Version',          ar: 'الإصدار'           },
  'set.env':         { en: 'Environment',      ar: 'البيئة'            },
  'set.env_val':     { en: 'Production',       ar: 'الإنتاج'           },
  'set.uptime':      { en: 'Uptime',           ar: 'مدة التشغيل'       },
  'set.updated':     { en: 'Last Updated',     ar: 'آخر تحديث'         },

  // Permissions
  'set.perms':       { en: 'Your Permissions', ar: 'صلاحياتك'          },
  'set.hr_admin':    { en: 'HR Admin',         ar: 'مسؤول موارد بشرية' },
  'set.pay_access':  { en: 'Payroll Access',   ar: 'الوصول للرواتب'    },
  'set.sys_set':     { en: 'System Settings',  ar: 'إعدادات النظام'    },
  'set.audit_logs':  { en: 'Audit Logs',       ar: 'سجلات المراجعة'    },
  'set.granted':     { en: 'Granted',          ar: 'ممنوح'             },
  'set.denied':      { en: 'Denied',           ar: 'مرفوض'             },
  'set.req_access':  { en: 'Request Access',   ar: 'طلب وصول'          },

  // Appearance
  'set.appear':      { en: 'Appearance',       ar: 'المظهر'            },
  'set.theme_pref':  { en: 'Theme preference',  ar: 'تفضيلات الثيم'     },
  'set.light':       { en: 'Light',            ar: 'فاتح'              },
  'set.uptime_val':  { en: '60+ days',        ar: '60+ يوم'         },
  'set.updated_val': { en: 'May 14, 2026',     ar: '14 مايو 2026'    },

  // Auth
  'auth.title':      { en: 'System Access',    ar: 'الوصول للنظام'     },
  'auth.subtitle':   { en: 'Enter credentials to authenticate', ar: 'أدخل بيانات الاعتماد للمصادقة' },
  'auth.email':      { en: 'Email Address',    ar: 'البريد الإلكتروني'  },
  'auth.password':   { en: 'Password',         ar: 'كلمة المرور'       },
  'auth.login':      { en: 'Authenticate',     ar: 'مصادقة'          },
  'auth.forgot':     { en: 'Forgot Password?', ar: 'نسيت كلمة المرور؟' },
};

const LangContext = createContext<LangCtx>({
  lang: 'en', setLang: () => {}, rtl: false, t: k => k,
});

export const LangProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<Lang>('en');
  const rtl = lang === 'ar';
  const t = (key: string) => DICT[key]?.[lang] ?? key;
  return (
    <LangContext.Provider value={{ lang, setLang, rtl, t }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
