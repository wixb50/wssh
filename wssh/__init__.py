# from .server import WSSHBridge

import pkgutil
__version__ = pkgutil.get_data(__package__, 'VERSION.txt').decode('ascii').strip()
del pkgutil
