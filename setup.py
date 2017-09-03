from setuptools import setup
from wssh import __version__


with open('requirements.txt') as f:
    required = f.read().splitlines()

setup(
    name='wssh',
    version=__version__,
    author='wixb50',
    author_email='wixb50@gmail.com',
    packages=[
        'wssh'
    ],
    scripts=[
        'bin/wssh',
        'bin/wsshd'
    ],
    package_data={'': ['static/*', 'templates/*']},
    include_package_data=True,
    zip_safe=False,
    install_requires=required,
    description='SSH to WebSockets tool.',
    long_description='wssh is a SSH to WebSockets Bridge that lets you invoke a remote shell using nothing but HTTP.',
    keywords='SSH to WebSockets tool',
    license='GNU Affero GPL v3+',
    url='https://github.com/wixb50/wssh',
    download_url='https://github.com/wixb50/wssh',
    classifiers=[
        'Development Status :: 5 - Production/Stable',
        'Environment :: Console',
        'Intended Audience :: Developers',
        'License :: OSI Approved :: GNU Affero General Public License v3 or later (AGPLv3+)',
        'Natural Language :: English',
        'Operating System :: POSIX',
        'Operating System :: POSIX :: Linux',
        'Programming Language :: Python :: 3',
        'Topic :: Communications :: Email',
        'Topic :: Utilities',
    ]
)
