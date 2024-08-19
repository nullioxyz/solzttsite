<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmation of Your Contact Request</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #7c8f77;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
        }
        .content h2 {
            color: #333;
            font-size: 20px;
            margin-top: 0;
        }
        .content p {
            font-size: 16px;
            line-height: 1.6;
            margin: 10px 0;
        }
        .footer {
            text-align: center;
            padding: 10px;
            background-color: #f4f4f4;
            font-size: 14px;
            color: #777;
        }
        .footer a {
            color: #7c8f77;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>{{ __('Thank You for Contacting Us!') }}</h1>
        </div>

        <div class="content">
            <h2>{{ __('Hello') }} {{ $contact['firstname'] }},</h2>
            <p>{{ __('Thank you for reaching out to us! We have received your contact request and our team will get back to you as soon as possible. Here is a summary of your request:') }}</p>

            <p><strong>{{ __('Tattoo Idea:') }}</strong> {{ $contact['tattoo_idea'] }}</p>
            <p><strong>{{ __('References:') }}</strong> {{ $contact['references'] }}</p>
            <p><strong>{{ __('Preferred Size:') }}</strong> {{ $contact['size'] }}</p>
            <p><strong>{{ __('Body Location:') }}</strong> {{ $contact['body_location'] }}</p>
            <p><strong>{{ __('Pronouns:')}}</strong> {{ $contact['gender'] }}</p>
            <p><strong>{{ __('City:') }}</strong> {{ $contact['city'] }}</p>
            <p><strong>{{ __('Preferred Contact Method:') }}</strong> {{ $contact['contact_me_by'] }}</p>
            <p><strong>{{ __('Availability:') }}</strong> {{ $contact['availability'] }}</p>

            <p>{{ __('If you have any additional information to share, feel free to reply to this email.') }}</p>

            <p>{{ __('I appreciate your patience and will be in touch soon!') }}</p>
        </div>

        <div class="footer">
            <p>{{ __('If you have any questions, you can') }} <a href="mailto:solztt.br@gmail.com">{{ __('contact me') }}</a> {{ __('at any time.') }}</p>
            <p>&copy; {{ date('Y') }} Solztt. All rights reserved.</p>
        </div>
    </div>
</body>
</html>
