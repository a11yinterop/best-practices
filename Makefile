# makefile for Best Practices
#
# Copyright (C)  2015 by Educational Testing Service. All rights reserved.
#
# To the maximum extent permitted by applicable law, this work is
# provided as is, without any express or implied warranty of any kind.
# This work is contributed to IMS Global Learning Consortium Inc.
# pursuant to the terms of the IMS Intellectual Property Rights Policy.
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
.PHONY: clean all docx check

all: $(targets)

clean: 
	rm -f $(targets)

check:
	@scripts=$$(find examples -name '*.js') ; \
	for script in $$scripts ; do \
	echo Checking $$script ; \
	jshint $$script || exit $? ; \
	echo ; \
	done

docx: $(docx_targets)
