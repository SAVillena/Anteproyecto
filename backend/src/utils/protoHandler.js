import protobuf from 'protobufjs';
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const protoPath = path.resolve(__dirname, 'DataToUser.proto');

const loadProtoSchema = async () => {
    try {
        const root = await protobuf.load(protoPath);
        return root.lookupType('UserData');
    } catch (error) {
        console.error('Error al cargar el schema protobuf: ', error, protoPath);
        return null;
    }
}

export { loadProtoSchema };
