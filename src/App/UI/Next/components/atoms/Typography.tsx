const TypographyH1 = ({ text, className, ...props }) =>
  <h1 className={`scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ${className}`} {...props}>
    {text}
  </h1>

const TypographyH2 = ({ text, className, ...props }) =>
  <h2 className={`scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 ${className}`} {...props}>
    {text}
  </h2>

const TypographyH3 = ({ text, className, ...props }) =>
  <h3 className={`scroll-m-20 text-2xl font-semibold tracking-tight ${className}`} {...props}>
    {text}
  </h3>

const TypographyH4 = ({ text, className, ...props }) =>
  <h4 className={`scroll-m-20 text-xl font-semibold tracking-tight ${className}`} {...props}>
    {text}
  </h4>

const TypographyNav = ({ text, className, ...props }) =>
  <h4 className={`scroll-m-20 font-semibold tracking-tight ${className}`} {...props}>
    {text}
  </h4>

const TypographyP = ({ text, className, ...props }) =>
  <p className={`leading-7 [&:not(:first-child)]:mt-6 ${className}`} {...props}>
    {text}
  </p>

const TypographyLead = ({ text, className, ...props }) =>
  <p className={`text-xl text-muted-foreground ${className}`} {...props}>
    {text}
  </p>

const TypographyLarge = ({ text, className, ...props }) =>
    <div className={`text-lg font-semibold ${className}`} {...props}> {text}</div>

const TypographySmall = ({ text, className, ...props }) =>
    <small className={`text-sm font-medium leading-none ${className}`} {...props}> {text}</small>

const TypographyMuted = ({ text, className, ...props }) =>
    <p className={`text-sm text-muted-foreground ${className}`} {...props}> {text}</p>

export {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyP,
  TypographyLead,
  TypographyLarge,
  TypographySmall,
  TypographyMuted,
  TypographyNav
}