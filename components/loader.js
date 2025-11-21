async function loadComponent(componentName, targetElement) {
    try {
        const response = await fetch(`components/${componentName}.html`);
        if (!response.ok) {
            throw new Error(`Failed to load ${componentName}`);
        }
        const html = await response.text();
        const container = document.querySelector(targetElement);
        if (container) {
            container.innerHTML = html;
            return true;
        } else {
            console.error(`Target element ${targetElement} not found`);
            return false;
        }
    } catch (error) {
        console.error(`Error loading component ${componentName}:`, error);
        return false;
    }
}

async function loadAllComponents() {
    const components = [
        { name: 'nav', target: '#nav-container' },
        { name: 'hero', target: '#hero-container' },
        { name: 'products', target: '#products-container' },
        { name: 'categories', target: '#categories-container' },
        { name: 'about', target: '#about-container' },
        { name: 'features', target: '#features-container' },
        { name: 'cta', target: '#cta-container' },
        { name: 'footer', target: '#footer-container' }
    ];

    for (const component of components) {
        await loadComponent(component.name, component.target);
    }

    window.dispatchEvent(new CustomEvent('componentsLoaded'));
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadAllComponents);
} else {
    loadAllComponents();
}

