import { JsonRow } from '../../JsonRow';
import { ValueAccessor } from './ValueAccessor';

export class FieldAccessor implements ValueAccessor {
    public key = 'field';

    access(row: JsonRow, key: string) {
        return row[key];
    }
}
