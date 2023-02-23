#!/usr/bin/env python3
"""
app module
"""
from flask import Flask, render_template, request, g
from flask_babel import Babel
import pytz
from datetime import datetime

app = Flask(__name__)
babel = Babel()

users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


@app.before_request
def before_request():
    """
    before_request function
    """
    g.user = get_user()

    locale = get_locale()
    current_time = datetime.now(get_timezone())
    if locale == "fr":
        g.current_time = current_time.strftime('%d %B %Y à %H:%M:%S')
    else:
        g.current_time = current_time.strftime('%b %d, %Y, %I:%M:%S %p')


class Config(object):
    """
    Config class
    """
    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


app.config.from_object(Config)
babel.init_app(app)


@babel.localeselector
def get_locale():
    """
    get_locale function
    """
    locale = request.args.get("locale")
    if locale and locale in Config.LANGUAGES:
        return locale

    if g.user:
        locale = g.user.get("locale")
        if locale and locale in Config.LANGUAGES:
            return locale

    locale = request.headers.get("locale")
    if locale and locale in Config.LANGUAGES:
        return locale

    return request.accept_languages.best_match(Config.LANGUAGES)


@babel.timezoneselector
def get_timezone():
    """
    get_timezone function
    """
    user_timez = request.args.get('timezone', None)
    if not user_timez and g.user:
        user_timez = g.user.get('timezone')
    if user_timez:
        try:
            return pytz.timezone(user_timez)
        except pytz.exceptions.UnknownTimeZoneError:
            pass
    return pytz.timezone(app.config['BABEL_DEFAULT_TIMEZONE'])


@app.route("/", methods=["GET"])
def index():
    """
    index route
    """
    return render_template("index.html")


def get_user():
    """
    get_user function
    """
    user_id = request.args.get('login_as')
    if user_id and int(user_id) in users:
        return users[int(user_id)]
    else:
        return None


if __name__ == "__main__":
    app.run(host="0.0.0.0", port="5000")
