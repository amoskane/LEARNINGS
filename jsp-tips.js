Supplies a parameter to the current servlet bean.
<dsp:oparam name="param-name">
   ...
</dsp:oparam>





ParameterName:name(Required)

The name attribute identifies a specific input parameter that is defined for the parent servlet bean. Each servlet bean accepts a distinct set of input parameters; for more information on servlet bean input parameters, see Appendix B, ATG Servlet Beans.

ParameterValue:bean,param,orvalue(Required)

These attributes provide the value to the input parameter identified in the name attribute. You must set the value equal to a component property (bean), page parameter (param), or constant (value).





Identifies a servlet bean input parameter; or defines a page parameter.
<dsp:param name="sbparam-name" sbparam-value />
<dsp:param name="pgparam-name" pgparam-value />





A page parameter is a named value that one page can pass on to another. A page parameter can be set to a component property, another parameter, or a constant value. Page parameters are typically appended to a URL as query strings or are submitted with a form. Tags that invoke other pages, such as dsp:a and dsp:include, can set these query strings. A JSP can explicitly define its own page parameters through the tag dsp:param. An embedded page also inherits the page parameters of its parent page.




