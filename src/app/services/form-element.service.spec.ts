import { FormElementService, FormCategory } from './form-element.service';

describe('FormElementService', () => {
  let service: FormElementService;

  const mockData: FormCategory[] = [
    {
      category: 'Basic',
      fields: [
        { id: '1', category: 'Basic', label: 'Text', type: 'text', icon: 'fas fa-font' },
        { id: '2', category: 'Basic', label: 'Date', type: 'date', icon: 'fas fa-calendar' }
      ]
    },
    {
      category: 'Advanced',
      fields: [{ id: '3', category: 'Advanced', label: 'Checkbox', type: 'checkbox', icon: 'fas fa-check-square' }]
    }
  ];

  beforeEach(() => {
    service = new FormElementService();
    (service as any).categoriesSubject.next(mockData); // Bypass fetch for unit test
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all categories if query is empty', () => {
    const result = service.filterCategories('');
    expect(result.length).toBe(2);
  });

  it('should filter elements by query (case-insensitive)', () => {
    const result = service.filterCategories('text');
    expect(result.length).toBe(1);
    expect(result[0].fields[0].label).toBe('Text');
  });

  it('should return empty if no element matches the query', () => {
    const result = service.filterCategories('unknown');
    expect(result.length).toBe(0);
  });
});
