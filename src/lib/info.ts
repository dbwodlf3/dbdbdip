/**
 * This is base class for making comment programmable
*/
class Information {
    annotations: Annotation[] = [];
}

class Annotation {
    name = 'Annotation';
    description = 'This is default annotation.';
}

class TableAnnotation extends Annotation {
    name = 'TableAnnotation';
    engine = '';
    description = '';
}

class TableColumnAnnotation extends Annotation {
    name = 'TableColumnAnnotation';
    description = '';
    constraints = [];
}

class ViewAnnotation extends Annotation {
    name = 'ViewAnnotation'
    description = '';
}

class ProcedureAnnotation extends Annotation {
    name = 'ProcedureAnnotation';
    description = '';
}