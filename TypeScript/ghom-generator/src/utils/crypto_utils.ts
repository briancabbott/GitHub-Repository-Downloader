import { readFileSync } from 'fs';
import { GeneratedArtifactInfo } from '../ghom_generator';


export class CryptoUtils {
    static async hashGeneratedTarget(fileArtifactInfo: GeneratedArtifactInfo): Promise<string> {
        const { createHash } = await import('crypto');
        const hash = createHash('sha256');

        let fileContents = readFileSync(fileArtifactInfo.filepath, {encoding: "utf8"});
        hash.update(fileContents);
        return hash.digest('hex');
    }
}