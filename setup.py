from setuptools import setup, find_packages

VERSION = '0.1.3'

setup(
    name="mkdocs-windmillex",
    version=VERSION,
    url='https://github.com/guenbakku/mkdocs-windmillex',
    license='MIT',
    description='MkDocs theme focused on navigation and usability',
    author='',
    author_email='',
    packages=find_packages(),
    include_package_data=True,
    entry_points={
        'mkdocs.themes': [
            'windmillex = mkdocs_windmillex',
        ]
    },
    zip_safe=False
)
