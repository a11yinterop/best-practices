# makefile for Best Practices
#
# define the source files
sources=$(wildcard *.md)
# targets
html_targets=$(sources:.md=.html)
docx_targets=$(sources:.md=.docx)
targets=$(html_targets) $(docx_targets)
# implicit rules
%.html: %.md
	pandoc -s -w html5 $< -o $@
%.docx: %.md
	pandoc -s -w docx $< -o $@

# targets
.PHONY: clean all docx

all: $(targets)

clean: 
	rm -f $(targets)

docx: $(docx_targets)
