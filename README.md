# GitHub-Repository-Downloader
Small Command-Line utility to capture, list, query, and clone repositories in bulk from an organization.

## Language Driven Structure
The Nature of the GitHub Client is such that it is a good set of features/functionality that makes it a good target 
for learning or demonstrating skillsets in a variety of languages. Therefore, I am 
structuring this project in a language specific manner or language-first manner.

## Longer term goals

### Full code modelling for either Structured Representation and processing or, for LLM oriented research.
   - Online Social-Coding Repositories
      - Integrate around a common model a variety social coding platforms.
         - GitHub
         - BitBucket
         - GitLab
         - SourceForge
         - GNU Savannah URLs (https://savannah.gnu.org/)
         - Other major open source projects:
      - SCSS Representations as well as an intermediate agnostic:
         - Git
         - Mercurial
         - Subversion
         - CVS
         - Bazaar
         - Fossil
         - Darcs
         - Monotone
         - Perforce (structured integrated model - look toward this for an intermediate)
    - Normalized Code Models
        - Static Source Model
        - Dynamic Runtime Model
        - a highlevel semantic of a pure imperative vs an imperative compiled/targeted to a DLR (i.e. obj-c msg-brokering) 
        - specialized models for major targets... 
        - Data-path flow Models
        - Data-graph distribute model on local single process runtime insstances 
        - for external/disparate systems that is the nature of Microservice type architectures.
        - Projected Composite Model
        - Semantic Models
            - Imperative Domain
            - Functional Domain 
        - the sum of the models applied will give insite that 
            is synergistic and feedback loop compounding
                - we can calculate a semantic model from the combination of Stat, Run, Data that can give an embeddedness metric 
                on change vectors (from code, from data, from re-deployment) that will allow us to actually 
                calculate the degree of magnitude each variable has within the system
    - Integrate disparate data-sources that can be n-degrees related to a code-base:
        - Security Information
        - CVE database
        - NVD database
        - OWASP?


Note: How to get all GitHub Repositories List:
    Google Cloud Platform's BigQuery Utility has a set of public data-sets, of which one of them is
    a GitHub Repository Catalog, captured in 2016. It can be queried from BigTable and, the results exported.
    BigTable access information is as follows:

        bigquery-public-data:github_repos
        Description
            Contents from 2.9M public, open source licensed repositories on GitHub.
        Labels
            None
        Dataset info
            Dataset ID	    bigquery-public-data:github_repos
            Created	        Mar 10, 2016, 7:40:33 PM
            Default table expiration	Never
            Last modified	Jun 29, 2016, 9:16:47 PM
            Data location	US
