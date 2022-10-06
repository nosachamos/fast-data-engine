import { JsonRow } from '../../JsonRow';
import { ValueAccessor } from './ValueAccessor';

export class FieldAccessor implements ValueAccessor {
    public key: 'field' = 'field';

    access(row: JsonRow, key: string) {
        return row[key];
    }
}
