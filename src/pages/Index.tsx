import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import func2url from '../../backend/func2url.json';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [b2bForm, setB2bForm] = useState({ name: '', company: '', phone: '', email: '', products: '', comment: '' });
  const [b2bStatus, setB2bStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleB2bSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setB2bStatus('loading');
    try {
      const res = await fetch(func2url['send-b2b'], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(b2bForm),
      });
      if (res.ok) {
        setB2bStatus('success');
        setB2bForm({ name: '', company: '', phone: '', email: '', products: '', comment: '' });
      } else {
        setB2bStatus('error');
      }
    } catch {
      setB2bStatus('error');
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const products = [
    { name: 'Высокобелковое молоко', description: 'Натуральное пастеризованное', icon: 'Milk' },
    { name: 'Высокобелковые безлактозные коктейли', description: 'с натуральными ягодными наполнителями', icon: 'Droplet' },
    { name: 'Творог', description: 'Свежий фермерский', icon: 'Cookie' },
    { name: 'Сметана', description: 'Густая и вкусная', icon: 'Sparkles' },
    { name: 'Йогурт', description: 'С натуральными добавками', icon: 'IceCream' },
    { name: 'Творожные массы, крема', description: 'Различные сорта', icon: 'Sandwich' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-muted/30">
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="https://cdn.poehali.dev/files/e122d7f9-2b35-4c35-bf61-841b58484ad0.png"
                alt="ВМЗ"
                className="h-16 w-auto"
              />
            </div>
            <div className="hidden md:flex items-center space-x-6">
              {['home', 'products', 'about', 'production', 'quality', 'contacts', 'purchases', 'b2b'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-foreground/70'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'products' && 'Продукция'}
                  {section === 'about' && 'О заводе'}
                  {section === 'production' && 'Производство'}
                  {section === 'quality' && 'Качество'}
                  {section === 'contacts' && 'Контакты'}
                  {section === 'purchases' && 'Закупки'}
                  {section === 'b2b' && 'B2B'}
                </button>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <section id="home" className="pt-32 pb-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <img
              src="https://cdn.poehali.dev/files/a9b6f0ad-7be3-4eab-9601-efbd350cba18.png"
              alt="Вкус и польза в каждой ложке"
              className="mx-auto mb-8 max-w-2xl w-full"
            />
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
              Натуральные молочные продукты с заботой о вашем здоровье
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Верейский молочный завод - 10 лет качества, основанного на лучших традициях производства молочной продукции!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => scrollToSection('products')}>
                <Icon name="ShoppingCart" className="mr-2" size={20} />
                Наша продукция
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollToSection('about')}>
                <Icon name="Info" className="mr-2" size={20} />
                Узнать больше
              </Button>
              <Button size="lg" variant="outline" onClick={() => window.location.href = '/presentation'}>
                <Icon name="Presentation" className="mr-2" size={20} />
                Презентация
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="products" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Наша продукция</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Широкий ассортимент натуральных молочных продуктов высочайшего качества
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-scale-in">
            {products.map((product, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-primary/50"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <Icon name={product.icon} size={32} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                      <p className="text-muted-foreground">{product.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold mb-6">О Верейском молочном заводе</h2>
              <p className="text-lg text-muted-foreground mb-4">
                Верейский молочный завод работает с 2015 года, обеспечивая население  качественной молочной продукцией.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                Мы используем только натуральное молоко от проверенных фермерских хозяйств, соблюдаем все стандарты качества и безопасности.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                Наша миссия — сохранять традиции натурального молочного производства и заботиться о здоровье каждой семьи.
              </p>
              <Button className="bg-primary hover:bg-primary/90" asChild>
                <a href="https://disk.yandex.ru/d/OUtpPIWFFfQZXQ" target="_blank" rel="noopener noreferrer">
                  <Icon name="FileText" className="mr-2" size={20} />
                  Скачать презентацию
                </a>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 animate-scale-in">
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold mb-2">10+</div>
                  <div className="text-sm">лет на рынке</div>
                </CardContent>
              </Card>
              <Card className="bg-secondary text-secondary-foreground">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold mb-2">15+</div>
                  <div className="text-sm">видов продукции</div>
                </CardContent>
              </Card>
              <Card className="bg-secondary text-secondary-foreground">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold mb-2">100%</div>
                  <div className="text-sm">натуральное молоко</div>
                </CardContent>
              </Card>
              <Card className="bg-primary text-primary-foreground">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl font-bold mb-2">500+</div>
                  <div className="text-sm">партнёров</div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="production" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Современное производство</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Новейшее оборудование и проверенные технологии для сохранения натуральности
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: 'Factory',
                title: 'Автоматизация',
                description: 'Современные линии розлива и упаковки с минимальным участием человека',
              },
              {
                icon: 'Thermometer',
                title: 'Контроль температуры',
                description: 'Строгое соблюдение температурных режимов на всех этапах производства',
              },
              {
                icon: 'Shield',
                title: 'Безопасность',
                description: 'Многоступенчатый контроль качества и санитарных норм',
              },
            ].map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name={item.icon} size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="quality" className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Контроль качества</h2>
            <p className="text-xl text-muted-foreground">
              Строгие стандарты на каждом этапе производства
            </p>
          </div>
          <div className="space-y-6">
            {[
              {
                step: '1',
                title: 'Приёмка сырья',
                description: 'Проверка качества молока в собственной лаборатории перед приёмкой',
              },
              {
                step: '2',
                title: 'Производство',
                description: 'Контроль температурных режимов и технологических процессов',
              },
              {
                step: '3',
                title: 'Упаковка',
                description: 'Проверка герметичности и маркировки готовой продукции',
              },
              {
                step: '4',
                title: 'Хранение',
                description: 'Соблюдение температурного режима на складе и при транспортировке',
              },
            ].map((item, index) => (
              <Card key={index} className="hover:border-primary/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl flex-shrink-0">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Контакты</h2>
            <p className="text-xl text-muted-foreground">
              Свяжитесь с нами удобным способом
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6">Отдел продаж</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Icon name="Phone" className="text-primary" size={20} />
                    <span>+7 (499) 322-00-92</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Mail" className="text-primary" size={20} />
                    <a href="mailto:eka@netfoods.ru" className="hover:text-primary transition-colors">eka@netfoods.ru</a>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Clock" className="text-primary" size={20} />
                    <span>Пн-Пт: 9:00 - 18:00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6">Адрес завода</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="MapPin" className="text-primary flex-shrink-0 mt-1" size={20} />
                    <span>МО, Наро-фоминский район, д. Ястребово, ул. Березовая, д.55</span>
                  </div>
                  <Separator />
                  <div className="text-sm text-muted-foreground">
                    Проезд от Москвы: 95 км по Минскому шоссе
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section id="purchases" className="py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6">Закупки сырья</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Мы заинтересованы в сотрудничестве с фермерскими хозяйствами и поставщиками качественного молока
          </p>
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4">Требования к сырью</h3>
              <ul className="text-left space-y-3 mb-6 max-w-xl mx-auto">
                <li className="flex items-start space-x-3">
                  <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-1" size={20} />
                  <span>Молоко высшего или первого сорта</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-1" size={20} />
                  <span>Соответствие ГОСТ 31449-2013</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-1" size={20} />
                  <span>Регулярные поставки от 500 литров в день</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-1" size={20} />
                  <span>Наличие ветеринарных документов</span>
                </li>
              </ul>
              <div className="flex items-center space-x-2 text-lg">
                <Icon name="Mail" size={20} className="text-primary" />
                <a href="mailto:kermen@netfoods.ru" className="text-primary hover:underline">
                  kermen@netfoods.ru
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="b2b" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">B2B — Оптовые поставки</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Поставки высококачественной молочной продукции для промышленного использования. Гарантируем стабильные поставки, соответствие ГОСТ и индивидуальную фасовку под ваши задачи.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Package" className="text-primary" size={22} />
                  Ассортимент для B2B
                </h3>
                <div className="space-y-3">
                  {[
                    ['Сливки для соуса', '22% ТУ'],
                    ['Питьевые сливки', '10% ТУ'],
                    ['Молоко', '2,5%, 3,5%, цельное, обезжиренное'],
                    ['Творог из топлёного молока', 'Традиционная рецептура'],
                    ['Высокобелковый творог', 'До 22 г белка / 100 г'],
                    ['Безлактозный творог', 'Содержание лактозы < 0,01%'],
                  ].map(([name, desc]) => (
                    <div key={name} className="flex justify-between items-start gap-4 py-2 border-b last:border-0">
                      <span className="font-medium">{name}</span>
                      <span className="text-muted-foreground text-sm text-right">{desc}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Settings2" className="text-primary" size={22} />
                  Условия сотрудничества
                </h3>
                <ul className="space-y-3">
                  {[
                    'Фасовка: bulk, порционная, транспортная тара',
                    'СТМ: производство под вашей торговой маркой',
                    'Документация: сертификаты, Меркурий, декларации',
                    'Логистика: собственный транспорт или перевозчики',
                    'Оплата: безналичный расчёт, отсрочка для постоянных партнёров',
                    'Минимальный заказ: от 100 кг по позиции',
                    'Срок поставки: 3–10 рабочих дней',
                    'Отгрузка: д. Ястребово, Московская обл.',
                    'Работаем с НДС',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-0.5" size={18} />
                      <span className="text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Icon name="Star" className="text-primary" size={22} />
                Наши преимущества
              </h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  'Собственное производство в Московской области — короткие логистические цепочки',
                  'Строгий контроль качества на всех этапах',
                  'Соответствие ГОСТ и ТР ТС',
                  'Гибкость: адаптируем рецептуры и фасовку под ваши требования',
                  'Стабильность поставок — работаем без сезонных перебоев',
                  'Возможность запуска новых позиций под запрос клиента',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2 bg-primary/5 rounded-lg p-3">
                    <Icon name="CheckCircle2" className="text-primary flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4">Как оформить заказ?</h3>
              <div className="grid sm:grid-cols-5 gap-4 mb-8">
                {[
                  'Свяжитесь с нами',
                  'Согласуйте ассортимент и условия',
                  'Получите счёт и договор',
                  'Осуществите оплату',
                  'Получите продукцию',
                ].map((step, i) => (
                  <div key={i} className="text-center">
                    <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center text-lg font-bold mx-auto mb-2">
                      {i + 1}
                    </div>
                    <p className="text-sm opacity-90">{step}</p>
                  </div>
                ))}
              </div>
              <Separator className="bg-primary-foreground/20 mb-6" />
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex-1">
                  <p className="font-semibold mb-1">Малышева Екатерина</p>
                  <p className="text-sm opacity-80">Руководитель направления по разработке и запуску новых продуктов</p>
                  <p className="text-sm opacity-80">ООО «Верейский молочный завод»</p>
                </div>
                <div className="flex flex-col gap-2">
                  <a href="mailto:eka@netfoods.ru" className="flex items-center gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors rounded-lg px-4 py-2 text-sm font-medium">
                    <Icon name="Mail" size={18} />
                    eka@netfoods.ru
                  </a>
                  <a href="tel:+79252234503" className="flex items-center gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 transition-colors rounded-lg px-4 py-2 text-sm font-medium">
                    <Icon name="Phone" size={18} />
                    +7 (925) 223-45-03
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                <Icon name="Send" className="text-primary" size={24} />
                Оставить заявку
              </h3>
              <p className="text-muted-foreground mb-6">Заполните форму — свяжемся с вами в течение одного рабочего дня</p>

              {b2bStatus === 'success' ? (
                <div className="flex flex-col items-center py-10 text-center gap-3">
                  <Icon name="CheckCircle2" className="text-primary" size={48} />
                  <p className="text-xl font-semibold">Заявка отправлена!</p>
                  <p className="text-muted-foreground">Екатерина свяжется с вами в ближайшее время.</p>
                  <Button variant="outline" className="mt-2" onClick={() => setB2bStatus('idle')}>Отправить ещё</Button>
                </div>
              ) : (
                <form onSubmit={handleB2bSubmit} className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Имя *</label>
                    <Input placeholder="Иван Иванов" value={b2bForm.name} onChange={e => setB2bForm(f => ({ ...f, name: e.target.value }))} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Компания</label>
                    <Input placeholder="ООО Ромашка" value={b2bForm.company} onChange={e => setB2bForm(f => ({ ...f, company: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Телефон *</label>
                    <Input placeholder="+7 (___) ___-__-__" value={b2bForm.phone} onChange={e => setB2bForm(f => ({ ...f, phone: e.target.value }))} required />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Email</label>
                    <Input type="email" placeholder="mail@company.ru" value={b2bForm.email} onChange={e => setB2bForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium mb-1 block">Интересующая продукция</label>
                    <Input placeholder="Например: творог, сливки 22%" value={b2bForm.products} onChange={e => setB2bForm(f => ({ ...f, products: e.target.value }))} />
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium mb-1 block">Комментарий</label>
                    <Textarea placeholder="Объём, условия, вопросы..." rows={3} value={b2bForm.comment} onChange={e => setB2bForm(f => ({ ...f, comment: e.target.value }))} />
                  </div>
                  {b2bStatus === 'error' && (
                    <p className="md:col-span-2 text-sm text-destructive">Ошибка отправки. Попробуйте ещё раз или напишите на eka@netfoods.ru</p>
                  )}
                  <div className="md:col-span-2">
                    <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={b2bStatus === 'loading'}>
                      {b2bStatus === 'loading' ? <><Icon name="Loader2" className="mr-2 animate-spin" size={18} />Отправляем...</> : <><Icon name="Send" className="mr-2" size={18} />Отправить заявку</>}
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="bg-foreground text-background py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <img
                src="https://cdn.poehali.dev/files/e122d7f9-2b35-4c35-bf61-841b58484ad0.png"
                alt="ВМЗ"
                className="h-16 w-auto mb-4 brightness-0 invert"
              />
              <p className="text-sm opacity-80">
                Натуральные молочные продукты с 1970 года
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Быстрые ссылки</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <button onClick={() => scrollToSection('about')} className="hover:opacity-100 transition-opacity">
                    О заводе
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('products')} className="hover:opacity-100 transition-opacity">
                    Продукция
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('quality')} className="hover:opacity-100 transition-opacity">
                    Качество
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <Separator className="bg-background/20 mb-8" />
          <div className="text-center text-sm opacity-70">
            © 2024 Верейский молочный завод. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;