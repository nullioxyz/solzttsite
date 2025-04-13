<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Notification</title>
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
            background-color: #f4f4f4;
            color: #000000;
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
            color: #4CAF50;
            text-decoration: none;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            margin-top: 20px;
            background-color: #f4f4f4;
            color: #000000;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>{{ __('New Contact Request') }}</h1>
        </div>

        <div class="content">
            <h2>{{ __('Hello') }},</h2>
            <p>{{ __('You have received a new contact request from your website. Here are the details:') }}</p>

            <p><strong>{{ __('Name: ') }}</strong> {{ $contact['firstname'] }} {{ $contact['lastname'] }}</p>
            <p><strong>{{ __('Email:') }}</strong> {{ $contact['email'] }}</p>
            <p><strong>{{ __('Phone:') }}</strong> {{ $contact['phone'] }}</p>
            <p><strong>{{ __('Preferred Contact Method:') }}</strong> {{ $contact['contact_me_by'] }}</p>
            <p><strong>{{ __('Tattoo Idea:') }}</strong> {{ $contact['tattoo_idea'] }}</p>
            <p><strong>{{ __('References:') }}</strong> {{ $contact['references'] }}</p>
            <p><strong>{{ __('Size:') }}</strong> {{ $contact['size'] }}</p>
            <p><strong>{{ __('Body Location:') }}</strong> {{ $contact['body_location'] }}</p>
            <p><strong>{{ __('Pronouns:') }}</strong> {{ $contact['gender'] }}</p>
            <p><strong>{{ __('City:') }}</strong> {{ $contact['city'] }}</p>
            <p><strong>{{ __('Availability:') }}</strong> {{ $contact['availability'] }}</p>
        </div>

        <div class="footer">
            <p>&copy; {{ date('Y') }} {{ __('Solztt. All rights reserved.') }}</p>
        </div>
    </div>
</body>
</html>
