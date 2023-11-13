from pynput import keyboard
from serial import Serial
import time

# Configuración del puerto serial
ser = Serial("COM10", 9600, timeout=1)

# Comprobar si el puerto está abierto
if ser.isOpen():
    print(f"Conectado a {ser.name}")

# Función para enviar comandos
def send_command(command):
    ser.write(command.encode('utf-8'))
    ##time.sleep(0.1)  # Ajusta según la necesidadweweaweawdawewadasdawdaevsdfsdfsdf

# Diccionario para mapear teclas a comandos
key_to_command = {'w': 'F', 'a': 'L', 's': 'B', 'd': 'R', 'stop': 'S'}

# Evento de tecla presionada
def on_press(key):
    try:
        if key.char in key_to_command:
            send_command(key_to_command[key.char])
    except AttributeError:
        pass

# Evento de tecla liberada
def on_release(key):
    send_command(key_to_command['stop'])
    if key == keyboard.Key.esc:
        # Detener el listener
        return False

# Escuchar eventos del teclado
listener = keyboard.Listener(on_press=on_press, on_release=on_release)
listener.start()
listener.join()

# Cerrar la conexión serial al finalizar
ser.close()