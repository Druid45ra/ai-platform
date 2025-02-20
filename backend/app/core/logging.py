import logging
from logging.config import dictConfig

class LogConfig:
    """
    Logging configuration to be set for the server
    """
    version = 1
    disable_existing_loggers = False
    formatters = {
        'default': {
            'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        },
        'detailed': {
            'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s [in %(pathname)s:%(lineno)d]',
        },
    }
    handlers = {
        'console': {
            'class': 'logging.StreamHandler',
            'formatter': 'default',
        },
        'file': {
            'class': 'logging.FileHandler',
            'formatter': 'detailed',
            'filename': 'app.log',
        },
    }
    root = {
        'handlers': ['console', 'file'],
        'level': 'INFO',
    }

def setup_logging():
    """
    Setup logging configuration
    """
    dictConfig(LogConfig.__dict__)

# To use this logging configuration, you need to call setup_logging() at the start of your application.
# Example:
# from app.core.logging import setup_logging
#
# setup_logging()
