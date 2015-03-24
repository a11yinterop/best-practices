# makefile for Best Practices
#
# define the source files
exclusions=README.md
sources=$(filter-out $(exclusions), $(wildcard *.md))
# targets
html_targets=$(sources:.md=.html)
docx_targets=$(sources:.md=.docx)
targets=$(html_targets) $(docx_targets)
# Set document metadata
metadata=-M date="$(shell date +"%d %B %Y")"
# implicit rules
%.html: %.md
	pandoc -s -w html5 $(metadata) $< -o $@
%.docx: %.md
	pandoc -s -w docx $(metadata) $< -o $@

# targets
.PHONY: clean all docx

all: $(targets)

clean: 
	rm -f $(targets)

docx: $(docx_targets)
