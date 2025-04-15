import { getFirestore, collection, doc, setDoc, getDoc, updateDoc, addDoc, Timestamp, serverTimestamp, query, where, getDocs } from "firebase/firestore";
import { AuthService } from './auth'; // Importamos el AuthService

const db = getFirestore();

const generateRoomCode = () => {
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789'; // sin letras/confusas como O/0/I
    return Array.from({ length: 6 }, () =>
      characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');
};

// Función para crear una sala
async function crearSala() {
    try {
        const userId = AuthService.getCurrentUserId();  // Obtener el ID del usuario automáticamente

        // 1. Obtener o crear jugador
        const jugador = await obtenerOCrearJugador(userId);

        // 2. Crear la sala (games)
        const code = generateRoomCode();  // Generar el código para la sala

        // Crear un documento vacío en la colección de juegos
        const newGameRef = doc(collection(db, 'games')); 
        const gameData = {
            code,  // Usamos el código generado para la sala
            status: 'waiting',
            created_at: Timestamp.now(),
            current_turn_player_id: jugador.id
        };
        
        // Guardamos el documento de la sala con el código
        await setDoc(newGameRef, gameData);

        // 3. Crear participante en subcolección 'participants'
        const participantRef = doc(collection(newGameRef, 'participants'));
        const participantData = {
            player_id: jugador.id,
            is_host: true,
            player_position: 0
        };
        await setDoc(participantRef, participantData);

        console.log('Sala y participante creados con éxito. Código de la sala:', code);
        return code;  // Devolver el código de la sala
    } catch (error) {
        console.error('Error al crear la sala con participante:', error);
        throw error;
    }
}

// Función para unirse a una sala (por ID)
async function unirseASala(code) {
    try {
        const userId = AuthService.getCurrentUserId();  // Obtener el ID del usuario automáticamente

        const gameRef = collection(db, 'games');  // Asegúrate de estar trabajando con la colección correcta
        const gameQuery = query(gameRef, where('code', '==', code));  // Consultar por el 'code'
        const gameSnap = await getDocs(gameQuery);

        if (gameSnap.empty) {
            throw new Error('La sala no existe');
        }

        const gameData = gameSnap.docs[0].data();  // Tomamos los datos del primer documento
        if (gameData.status !== 'waiting') {
            throw new Error('La sala ya está en progreso o finalizada');
        }

        // Obtener o crear jugador
        const jugador = await obtenerOCrearJugador(userId);

        // Verificar si ya está en la sala
        const participantsRef = collection(gameSnap.docs[0].ref, 'participants');
        const existingParticipantsSnap = await getDocs(participantsRef);
        const yaRegistrado = existingParticipantsSnap.docs.some(doc => doc.data().player_id === jugador.id);

        if (yaRegistrado) {
            console.log('El jugador ya estaba en la sala:', code);
            return;
        }

        // Calcular la posición: total de participantes actuales
        const player_position = existingParticipantsSnap.size;

        // Crear documento en subcolección 'participants'
        const newParticipantRef = await addDoc(participantsRef, {
            player_id: jugador.id,
            is_host: false,
            player_position,
        });

        console.log('Jugador unido a la sala:', code, '| Posición:', player_position);  // Mostrar el código y la posición
    } catch (error) {
        console.error('Error al unirse a la sala:', error);
        throw error;
    }
}


export async function obtenerOCrearJugador() {
    const playersRef = collection(db, "players");

    try {
        // Obtén el ID del usuario desde el servicio de autenticación
        const userId = await AuthService.getCurrentUserId();
         

        if (!userId) {
            throw new Error('No se pudo obtener el ID del usuario');
        }

        // Obtener el documento del usuario en la colección "usuarios" usando el userId
        console.log('userId:', userId);
        const userDocRef = doc(db, 'usuarios', userId);
        console.log('userDocRef:', userDocRef);
        const userSnap = await getDoc(userDocRef);  // Obtener los datos del usuario
        console.log(userSnap);

        if (!userSnap.exists()) {
            throw new Error('El usuario no existe en la colección "usuarios"');
        }

        const userProfile = userSnap.data();  // Obtener los datos del perfil del usuario

        // Buscar si ya existe un jugador con ese userId
        const q = query(playersRef, where("user_id", "==", userId));
        const querySnapshot = await getDocs(q);  // Realiza la consulta a la colección "players"

        if (!querySnapshot.empty) {
            // Si ya existe, devolver los datos del jugador
            const jugadorExistente = querySnapshot.docs[0];
            return {
                id: jugadorExistente.id,
                ...jugadorExistente.data(),
            };
        }

        // Si no existe el jugador, crear uno nuevo
        const nuevoJugador = {
            user_id: userId,
            nickname: userProfile.nombre,  // Usamos el nombre del perfil del usuario
            avatar_url: null,  // Puedes agregar un avatar o configurarlo más tarde
            created_at: serverTimestamp(),  // Marca la fecha de creación
        };

        // Crear el nuevo documento en la colección "players"
        const docRef = await addDoc(playersRef, nuevoJugador);

        return {
            id: docRef.id,
            ...nuevoJugador,  // Devolver la información del nuevo jugador
        };
    } catch (error) {
        console.error('Error al crear o obtener el jugador:', error);
        throw error;  // Re-lanzar el error para manejarlo fuera de esta función
    }
}


export { crearSala, unirseASala };



