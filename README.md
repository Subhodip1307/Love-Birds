<div align="center">
  <h1>Love Birds</h1>
  <img src="https://github.com/user-attachments/assets/949fcf9c-5b8b-48c1-bbb3-e3d29bfc65a1" alt="Love Birds">
</div>

## Disclaimer

**Warning**: This project is developed strictly for educational purposes only. The author does not endorse or support any illegal activities related to the use of this project. Please ensure you have the necessary permissions before using this software to access data.

## Overview

"Love Birds" is a Python-based project using FastAPI that allows you to grab the target's location and take a picture using their front camera just by sending them a link. It serves as a learning tool for understanding web APIs, Python, and networking, cyber awareness.



## Getting Started

### Prerequisites

Ensure that Python is installed on your system. You can download it from [python.org](https://www.python.org/downloads/).

### Setting Up a Virtual Environment

It is highly recommended to use a virtual environment to manage dependencies. Below are the steps to create and activate a virtual environment for different platforms:

#### Windows

1. Open Command Prompt or PowerShell.
2. Navigate to your project directory.
3. Run the following commands:

```bash
  python -m venv venv
 .\venv\Scripts\activate
```

### Linux and macOS

1. Open your terminal.

2. Navigate to your project directory.

3. Run the following commands:

```bash
python3 -m venv venv
source venv/bin/activate
```
## Install Dependencies

#### Windows
1. After Activateing Virtualenv run the following command

```bash
pip install -r requirements.txt
```

### Linux and macOS
1. After Activateing Virtualenv run the following command

```bash
pip3 install -r requirements.txt
```

## Start the Application

 - To run in localhost (127.0.0.1)
   
```bash
uvicorn main:app 
```
- To run on your ip to use it in your local network 

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 
```

## Port Forwarding
 
 ### Linux

 1. Download Cloudflare Tunnel using wget:

```bash
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64
```
2. Grant execution permissions:

```bash
chmod +x cloudflared-linux-amd64
```
3. Run the Cloudflare Tunnel from the Command Prompt:

```bash
 ./cloudflared-linux-amd64 tunnel --url http://127.0.0.1:8000
```

### Windows

1. Download the Cloudflare Tunnel executable from the [link](https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe):
2. Run the Cloudflare Tunnel from the Command Prompt:

```bash
cloudflared-windows-amd64.exe tunnel --url http://127.0.0.1:8000
```

### macOS

 1. Download Cloudflare Tunnel using curl:

```bash
curl -LO https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-darwin-amd64.tgz
```
2. Extract the tar file::

```bash
tar -xvzf cloudflared-darwin-amd64.tgz
```
3. Move the executable to /usr/local/bin:
```bash
sudo mv cloudflared /usr/local/bin
```
4. Run the Cloudflare Tunnel:
   
```bash
cloudflared tunnel --url http://127.0.0.1:8000
```
### Shareing Link
1. After Executing the command for port Forwarding, you will able to see something like the following image.

<div align="center">
  <img src="https://github.com/user-attachments/assets/de723818-5f79-45a2-a236-49c88854663c" alt="Love Birds">
</div>
2. This field will provide us with a shareable link.
