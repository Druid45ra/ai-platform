from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response
import time
import logging

logger = logging.getLogger(__name__)

class RequestLoggingMiddleware(BaseHTTPMiddleware):
    """
    Middleware to log details of each request.
    """
    async def dispatch(self, request: Request, call_next):
        logger.info(f"Request: {request.method} {request.url}")
        start_time = time.time()
        response = await call_next(request)
        process_time = time.time() - start_time
        logger.info(f"Response: {response.status_code} (processed in {process_time:.2f}s)")
        return response

class AddCustomHeaderMiddleware(BaseHTTPMiddleware):
    """
    Middleware to add a custom header to each response.
    """
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        response.headers['X-Custom-Header'] = 'Custom value'
        return response

# To use these middleware, you need to add them to your FastAPI application instance.
# Example:
# from fastapi import FastAPI
# from app.api.middleware import RequestLoggingMiddleware, AddCustomHeaderMiddleware
#
# app = FastAPI()
# app.add_middleware(RequestLoggingMiddleware)
# app.add_middleware(AddCustomHeaderMiddleware)
