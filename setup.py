from setuptools import setup, find_packages

VERSION = '1.0.5'

setup(
    name="mkdocs-windmill",
    version=VERSION,
    url='https://github.com/gristlabs/mkdocs-windmill',
    classifiers=[
        'Development Status :: 5 - Production/Stable',
        'License :: OSI Approved :: MIT License',
        'Topic :: Documentation',
        'Topic :: Text Processing',
    ],
    install_requires=[
        'mkdocs',
    ],
    license='MIT',
    description='MkDocs theme focused on navigation and usability',
    author='Dmitry S',
    author_email='dmitry@getgrist.com',
    packages=find_packages(),
    include_package_data=True,
    entry_points={
        'mkdocs.themes': [
            'windmill = mkdocs_windmill',
        ]
    },
    zip_safe=False
)
