const Container = ({ className, children }: any) => {
    return (
        <section className={className + ' mx-auto max-w-6xl px-4'}>
            {children}
        </section>
    )
}

export default Container