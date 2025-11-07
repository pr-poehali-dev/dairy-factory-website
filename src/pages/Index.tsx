import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
              {['home', 'products', 'about', 'production', 'quality', 'contacts', 'purchases'].map((section) => (
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
                </button>
              ))}
            </div>
            <Button className="bg-primary hover:bg-primary/90">
              Связаться
            </Button>
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
              <Button className="bg-primary hover:bg-primary/90">
                <Icon name="FileText" className="mr-2" size={20} />
                Скачать презентацию
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
                  <div className="text-4xl font-bold mb-2">2015</div>
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
              <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                <a href="mailto:kermen@netfoods.ru">
                  <Icon name="FileText" className="mr-2" size={20} />
                  Отправить заявку
                </a>
              </Button>
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
            <div>
              <h4 className="font-semibold mb-4">Следите за нами</h4>
              <div className="flex space-x-4">
                <Button variant="ghost" size="icon" className="text-background hover:bg-background/20">
                  <Icon name="Phone" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-background hover:bg-background/20">
                  <Icon name="Mail" size={20} />
                </Button>
              </div>
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