import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Отправка B2B заявки на почту eka@netfoods.ru"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))

    name = body.get('name', '').strip()
    company = body.get('company', '').strip()
    phone = body.get('phone', '').strip()
    email = body.get('email', '').strip()
    products = body.get('products', '').strip()
    comment = body.get('comment', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и телефон обязательны'}, ensure_ascii=False)
        }

    smtp_password = os.environ['SMTP_PASSWORD']
    smtp_user = 'eka@netfoods.ru'

    msg = MIMEMultipart('alternative')
    msg['Subject'] = f'Новая B2B заявка от {name}'
    msg['From'] = smtp_user
    msg['To'] = 'eka@netfoods.ru'

    html = f"""
    <html><body style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #2d6a4f;">Новая B2B заявка с сайта ВМЗ</h2>
      <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
        <tr><td style="padding: 8px; background:#f5f5f5; font-weight:bold; width:180px;">Имя</td><td style="padding:8px;">{name}</td></tr>
        <tr><td style="padding: 8px; background:#f5f5f5; font-weight:bold;">Компания</td><td style="padding:8px;">{company or '—'}</td></tr>
        <tr><td style="padding: 8px; background:#f5f5f5; font-weight:bold;">Телефон</td><td style="padding:8px;">{phone}</td></tr>
        <tr><td style="padding: 8px; background:#f5f5f5; font-weight:bold;">Email</td><td style="padding:8px;">{email or '—'}</td></tr>
        <tr><td style="padding: 8px; background:#f5f5f5; font-weight:bold;">Интересующая продукция</td><td style="padding:8px;">{products or '—'}</td></tr>
        <tr><td style="padding: 8px; background:#f5f5f5; font-weight:bold;">Комментарий</td><td style="padding:8px;">{comment or '—'}</td></tr>
      </table>
    </body></html>
    """

    msg.attach(MIMEText(html, 'html'))

    with smtplib.SMTP_SSL('smtp.mail.ru', 465) as server:
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_user, 'eka@netfoods.ru', msg.as_string())

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }