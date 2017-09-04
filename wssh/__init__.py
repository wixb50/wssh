from .server import WSSHBridge

with open('%s/VERSION.txt' % __package__) as f:
    __version__ = f.readline()
