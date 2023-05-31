type BreadcrumbItem = {
    label: string,
    link?: string
}

type BreadcrumbItems = {
    items: string | BreadcrumbItem[]
}