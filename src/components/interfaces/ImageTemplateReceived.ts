export interface ImageTemplateReceived {
    selectedTemplate: SelectedTemplate;
}

interface SelectedTemplate {
    name:         string;
    components:   Component[];
    language:     string;
    status:       string;
    category:     string;
    sub_category: string;
    id:           string;
}

interface Component {
    type:     string;
    format?:  string;
    example?: Example;
    text?:    string;
    buttons?: Button[];
}

interface Button {
    type:          string;
    text:          string;
    url?:          string;
    phone_number?: string;
}

interface Example {
    header_handle?: string[];
    body_text?:     Array<string[]>;
}
